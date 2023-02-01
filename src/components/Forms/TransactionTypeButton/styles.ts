import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { TransactionTypes } from ".";

interface IconProps {
  type: TransactionTypes;
}

interface ContainerProps {
  isActive: boolean;
  type: TransactionTypes;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, type, isActive }) => css`
    width: 48%;

    border: 1.5px solid ${theme.colors.text};
    border-radius: 5px;

    ${isActive &&
    type === "in" &&
    css`
      background-color: ${theme.colors.success_light};
      border: none;
    `}

    ${isActive &&
    type === "out" &&
    css`
      background-color: ${theme.colors.attention_light};
      border: none;
    `}
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  ${({ theme, type }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${type === "in" ? theme.colors.success : theme.colors.attention};
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(14)}px;
  `}
`;
