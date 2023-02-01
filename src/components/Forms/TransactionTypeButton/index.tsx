import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

const icons = {
  in: "arrow-down-circle",
  out: "arrow-up-circle",
};

export type TransactionTypes = "in" | "out";

interface Props extends RectButtonProps {
  label: string;
  type: TransactionTypes;
  isActive: boolean;
}

const TransactionTypeButton = ({ label, type, isActive, ...rest }: Props) => {
  return (
    <S.Container isActive={isActive} type={type}>
      <S.Button {...rest}>
        <S.Icon name={icons[type]} type={type} />
        <S.Label>{label}</S.Label>
      </S.Button>
    </S.Container>
  );
};

export default TransactionTypeButton;
