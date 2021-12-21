import styled from 'styled-components';
import theme from '../../../global/theme';

export const InputLabel = styled.label`
  font-size: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${theme.colors.accent};
`;
