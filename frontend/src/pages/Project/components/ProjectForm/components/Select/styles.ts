import styled from 'styled-components';
import theme from '../../../../../../global/theme';

export const SelectContainer = styled.select`
  width: 100%;
  border: thin solid ${theme.colors.accent};
  outline: none;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  color: ${theme.colors.accent};
`;

export const OptionContainer = styled.option``;
