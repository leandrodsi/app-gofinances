import React from "react";

import * as S from "./styles";

interface Props {
  label: string;
  onPress: () => void;
}

const CategorySelectButton = ({ label, onPress }: Props) => {
  return (
    <S.Container onPress={onPress}>
      <S.Category>{label}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
};

export default CategorySelectButton;
