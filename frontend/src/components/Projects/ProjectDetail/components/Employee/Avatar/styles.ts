import styled from 'styled-components';
import theme from '../../../../../../global/theme';

const avatarSize = '90px';

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${avatarSize};
  height: ${avatarSize};
  margin-right: 2rem;
  border-radius: 50%;
  background-color: ${theme.colors.accent};
  overflow: hidden;
`;

export const AvatarContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${theme.colors.primary};
  font-size: 20px;
  img {
    width: 95%;
    height: 95%;
    border-radius: 50%;
  }
`;
