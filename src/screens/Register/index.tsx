import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { Control, FieldValues, useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import Button from "../../components/Forms/Button";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import InputForm from "../../components/Forms/InputForm";
import TransactionTypeButton, {
  TransactionTypes,
} from "../../components/Forms/TransactionTypeButton";
import { AppRoutesParamList } from "../../routes/app.routes";
import { KEYS } from "../../utils/asyncStorageKeys";
import CategorySelect from "../CategorySelect";

import * as S from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

type RegisterProps = {
  navigation: BottomTabNavigationProp<AppRoutesParamList, "Cadastrar">;
};

const Register = ({ navigation }: RegisterProps) => {
  // const navigation = useNavigation();
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const formControll = control as unknown as Control<FieldValues, any>;

  const handleTransactionTypeSelect = (type: TransactionTypes) => {
    setTransactionType((prev) => (prev === type ? "" : type));
  };

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: uuid.v4().toString(),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(KEYS.transactions);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(
        KEYS.transactions,
        JSON.stringify(dataFormatted),
      );

      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      reset();

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Register</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name="name"
              control={formControll}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={formControll}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <S.TransactionsTypes>
              <TransactionTypeButton
                type="in"
                label="Income"
                onPress={() => handleTransactionTypeSelect("in")}
                isActive={transactionType === "in"}
              />
              <TransactionTypeButton
                type="out"
                label="Outcome"
                onPress={() => handleTransactionTypeSelect("out")}
                isActive={transactionType === "out"}
              />
            </S.TransactionsTypes>

            <CategorySelectButton
              label={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>

          <Button label="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
