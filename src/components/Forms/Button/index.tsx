import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

interface Props extends RectButtonProps {
  label: string;
  onPress: () => void;
}

const Button = ({ label, ...rest }: Props) => {
  return (
    <S.Container {...rest}>
      <S.Label>{label}</S.Label>
    </S.Container>
  );
};

export default Button;
