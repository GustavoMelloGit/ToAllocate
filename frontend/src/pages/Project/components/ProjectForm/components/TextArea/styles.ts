import styled from 'styled-components';
import theme from '../../../../../../global/theme';

export const TextArea = styled.textarea`
  width: 100%;
  border: thin solid ${theme.colors.accent};
  outline: none;
  font-size: 1.5rem;
  color: ${theme.colors.accent};
  min-width: 100%;
  max-width: 100%;
  padding: 0.5rem 1rem;
`;
