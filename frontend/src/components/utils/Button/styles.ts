import styled from 'styled-components';
import theme from '../../../global/theme';

type ButtonStyleProps = {
  filled: boolean;
};
export const Button = styled.button<ButtonStyleProps>`
  background-color: ${(props) =>
    props.filled ? theme.colors.accent : theme.colors.primary};
  border: none;
`;
