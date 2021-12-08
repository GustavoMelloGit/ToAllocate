import styled from 'styled-components';
import theme from '../../global/theme';

export const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 70%;
  color: ${theme.colors.accent};

  h2,
  p {
    margin-right: 5rem;
  }
  h2 {
    font-size: ${theme.fontSizes.xxl};
  }
  p {
    font-size: ${theme.fontSizes.xl};
    margin-top: 0;
  }
  @media (max-width: ${theme.screenSizes.md}) {
    width: 0%;
  }
`;
export const RedBox = styled.div`
  width: 30%;
  background-color: ${theme.colors.accent};
  h1 {
    color: ${theme.colors.primary};
  }
  @media (max-width: ${theme.screenSizes.md}) {
    width: 100%;
    h1 {
      text-align: center;
    }
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

export const SubmitButton = styled.button`
  width: 30%;
  min-width: 12rem;
  max-width: 15rem;
  height: 4.5rem;

  background-color: ${theme.colors.primary};
  border: none;
  border-radius: 4rem;
  ${(props) => props.disabled && 'opacity: 0.5'};

  color: ${theme.colors.accent};
  font-size: 2em;
  font-weight: ${theme.fontWeights.black};
`;
