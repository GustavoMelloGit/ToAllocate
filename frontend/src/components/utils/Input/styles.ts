import styled from 'styled-components';
import theme from '../../../global/theme';

export const Input = styled.input`
  border-radius: 0.6rem;
  margin: 1rem 0;
  height: 3.6rem;
  border: none;
  width: 70%;
  max-width: 25rem;
  padding: 0 1rem;
  color: ${theme.colors.accent};

  ::placeholder {
    color: ${theme.colors.accent};
  }
  :focus {
    outline: none;
  }
`;
