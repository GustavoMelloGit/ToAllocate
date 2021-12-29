import styled from 'styled-components';

export const EmployeeItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`;

export const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.6rem;
  text-transform: capitalize;
  h1 {
    margin: 0;
  }
`;
