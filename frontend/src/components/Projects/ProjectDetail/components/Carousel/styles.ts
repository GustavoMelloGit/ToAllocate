import styled from 'styled-components';
import Breakpoints from '../../../../../shared/constants/Breakpoints';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media screen and (max-width: ${Breakpoints.sm}px) {
    img {
      height: 200px;
    }
  }
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  .carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: ${Breakpoints.sm}px) {
    width: 100%;
  }
`;
