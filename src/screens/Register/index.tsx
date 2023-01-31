import React from "react";
import Input from "../../components/Forms/Input";

import * as S from "./styles";

const Register = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Register</S.Title>
      </S.Header>

      <Input placeholder="Nome" />
    </S.Container>
  );
};

export default Register;
