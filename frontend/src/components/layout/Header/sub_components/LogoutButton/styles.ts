import styled from 'styled-components';
import theme from '../../../../../global/theme';

export const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border: none;
  width: fit-content;
  align-self: flex-end;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.primary};
  margin: 1rem;
  h3 {
    font-weight: ${theme.fontWeights.regular};
    margin: 0;
    margin-right: 1.5rem;
  }

  @media (max-width: ${theme.screenSizes.sm}) {
    font-size: ${theme.fontSizes.xs};
  }
`;
