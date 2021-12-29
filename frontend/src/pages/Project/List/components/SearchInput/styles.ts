import styled from 'styled-components';
import theme from '../../../../../global/theme';

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
export const SearchInputContainer = styled.input`
  height: 100%;
  border: none;
  border-bottom: thin solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.md};
  background-color: transparent;

  :focus {
    outline: thin solid ${theme.colors.accent};
  }
  ::placeholder {
    color: ${theme.colors.accent};
  }
`;
