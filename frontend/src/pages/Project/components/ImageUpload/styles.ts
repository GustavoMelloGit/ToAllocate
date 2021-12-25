import styled from 'styled-components';
import theme from '../../../../global/theme';

export const UploadContainer = styled.div`
  flex: 1;
  height: 30vh;
  min-height: 140px;
  min-width: 330px;
  margin: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.colors.gray};

  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const ImageUploadedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  > span {
    font-weight: bold;
    font-size: 1.6rem;
    color: ${theme.colors.accent};
    margin: 0.5rem 0;
  }
`;

export const UploadInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 1rem;
`;

export const Image = styled.img`
  width: 40rem;
`;
export const FileInput = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 1.7rem;
  color: ${theme.colors.accent};
  text-transform: capitalize;

  > input {
    display: none;
  }
`;
