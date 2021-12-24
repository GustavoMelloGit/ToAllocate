import styled from 'styled-components';
import Breakpoints from '../../../../shared/constants/Breakpoints';

export const FormInputsWrapper = styled.aside`
  margin-top: 8rem;
  width: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${Breakpoints.md}px) {
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Form = styled.form`
  width: 40rem;
  text-align: center;

  > div {
    margin-bottom: 1rem;
  }
  button:not(:last-child) {
    margin-right: 1rem;
  }

  @media screen and (max-width: ${Breakpoints.sm}px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
