import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  h1 {
    margin: 0;
    font-size: 20rem;
  }
  @media (max-width: 945px) {
    h1 {
      font-size: 15rem;
    }
  }
`;
