import styled from 'styled-components';
import theme from '../../../global/theme';

export const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: ${theme.colors.primary};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
`;
