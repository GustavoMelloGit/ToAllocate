import styled from 'styled-components';
import theme from '../../../../../global/theme';
import Breakpoints from '../../../../../shared/constants/Breakpoints';

interface IProjectItemStyles {
  isReverse: boolean;
}

export const ProjectItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.accent};
  margin: 3rem 0;
  cursor: pointer;
  h3 {
    font-size: 4rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
  img {
    width: 25rem;
  }

  @media screen and (max-width: ${Breakpoints.sm}px) {
    h3 {
      font-size: 3rem;
    }
    p {
      font-size: 1.2rem;
    }
    img {
      width: 20rem;
    }
  }
`;
export const ProjectItemInfo = styled.div<IProjectItemStyles>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isReverse ? 'flex-start' : 'flex-end')};
  margin: 0 2rem;
`;
