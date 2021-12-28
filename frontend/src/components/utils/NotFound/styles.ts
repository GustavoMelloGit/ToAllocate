import styled from 'styled-components';
import theme from '../../../global/theme';

export const NotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
    font-weight: bold;
    color: ${theme.colors.accent};
  }
`;
