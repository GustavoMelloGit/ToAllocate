import styled from 'styled-components';
import theme from '../../../global/theme';
import Breakpoints from '../../../shared/constants/Breakpoints';

export const ProjectDetailComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 4rem;
  padding-bottom: 10rem;
  .indicators {
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  margin-top: 10rem;
  color: ${theme.colors.accent};

  @media screen and (max-width: ${Breakpoints.md}px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;
export const ContentHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  width: 100%;
  font-size: 30px;
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: 3rem;
  h1 {
    margin: 0;
  }
  span {
    font-size: 1.8rem;
  }

  @media screen and (max-width: ${Breakpoints.md}px) {
    align-items: center;
  }
`;

export const ProjectDetail = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.6rem;
    text-align: right;
  }
`;
export const EmployeesWrapper = styled.div``;
