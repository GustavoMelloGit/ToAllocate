import styled from 'styled-components';
import theme from '../../global/theme';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 6rem;
  .icon {
    font-size: 3rem;
    color: ${theme.colors.accent};
  }
`;
