import styled from 'styled-components';
import Breakpoints from '../../shared/constants/Breakpoints';

export const ProjectContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`;
export const ProjectForm = styled.form`
  margin-top: 5rem;
  width: 40rem;

  div:not(:last-child) {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: ${Breakpoints.sm}px) {
    width: 100%;
    padding: 0 1rem;
  }
`;
