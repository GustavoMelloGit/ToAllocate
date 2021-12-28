import styled from 'styled-components';
import theme from '../../../../global/theme';

export const ButtonContainer = styled.button`
  background-color: ${theme.colors.accent};
  min-width: 15rem;
  padding: 1rem;
  border: none;
  border-radius: 10rem;
  color: white;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  font-size: 1.5rem;
  font-weight: ${theme.fontWeights.bold};
`;
