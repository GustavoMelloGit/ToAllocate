import styled from 'styled-components';
import theme from '../../../global/theme';

export const HeaderContainer = styled.header`
  max-width: 100vw;
  height: 20vh;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  background-color: ${theme.colors.accent};
  overflow: hidden;

  color: ${theme.colors.primary};
  line-height: 15vh;

  h1 {
    font-size: ${theme.fontSizes.headerTitle};
    margin: 0;
  }
  @media (max-width: ${theme.screenSizes.md}) {
    font-size: 50%;
    min-height: 100px;
  }
  @media (max-width: ${theme.screenSizes.sm}) {
    font-size: 35%;
    height: 100px;
    line-height: 10vh;
  }
`;
