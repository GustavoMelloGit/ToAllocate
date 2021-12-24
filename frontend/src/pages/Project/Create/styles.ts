import styled from 'styled-components';
import Breakpoints from '../../../shared/constants/Breakpoints';

export const ProjectContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
`;
export const ProjectForm = styled.form`
  width: 40rem;

  div:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: ${Breakpoints.sm}px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
export const FormInputsWrapper = styled.aside`
  margin-top: 8rem;
  width: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${Breakpoints.md}px) {
    flex-direction: column;
  }
`;
