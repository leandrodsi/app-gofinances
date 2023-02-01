import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.secondary};

    padding: 18px;
    border-radius: 5px;
    align-items: center;
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${theme.colors.shape};
  `}
`;
