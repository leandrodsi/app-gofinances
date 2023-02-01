import React from "react";
import { categories } from "../../utils/categories";

import * as S from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "in" | "out";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

const TransactionCard = ({
  data: { type, name, amount, category, date },
}: Props) => {
  const [currentCategory] = categories.filter((item) => item.key === category);

  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      <S.Amount type={type}>
        {type === "out" && "- "}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={currentCategory.icon} />
          <S.CategoryName>{currentCategory.name}</S.CategoryName>
        </S.Category>

        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
};

export default TransactionCard;
