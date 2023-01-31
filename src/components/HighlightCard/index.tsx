import React from "react";

import * as S from "./styles";

interface Props {
  type: "entries" | "outs" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  entries: "arrow-up-circle",
  outs: "arrow-down-circle",
  total: "dollar-sign",
};

const HighlightCard = ({ title, amount, lastTransaction, type }: Props) => {
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon name={icon[type]} type={type} />
      </S.Header>

      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
};

export default HighlightCard;
