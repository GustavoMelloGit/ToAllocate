import React from 'react';
import {
  FileInput,
  ImageUploadedContainer,
  UploadContainer,
  UploadInner,
} from './styles';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import theme from '../../../../../../global/theme';
import { AdminButtonComponent } from '../../../../../../components';
import toast from 'react-hot-toast';

interface ImageUploadComponentProps {
  images?: any;
  setImages: React.Dispatch<React.SetStateAction<any>>;
  disabled?: boolean;
}
const ImageUploadComponent: React.FC<ImageUploadComponentProps> = (props) => {
  const { images, setImages, disabled } = props;

  const handleAddImage = (imageList: FileList | null) => {
    if (imageList) {
      if (imageList.length > 3) {
        toast.error('É possível adicionar no máximo 3 imagens');
        return;
      }
      setImages(imageList);
    }
  };

  const handleClearImages = () => {
    setImages({} as FileList);
  };

  if (images && Object.keys(images).length > 0) {
    let image;

    if (typeof images[0] === 'string') {
      image = images[0];
    } else {
      image = URL.createObjectURL(images[0]);
    }
    return (
      <ImageUploadedContainer>
        <UploadContainer>
          <img src={image} alt={images} />
        </UploadContainer>
        <span>Selecionadas: {images.length}</span>
        <AdminButtonComponent disabled={disabled} onClick={handleClearImages}>
          Remover fotos
        </AdminButtonComponent>
      </ImageUploadedContainer>
    );
  }

  return (
    <UploadContainer
      onDrop={(e) => {
        e.preventDefault();
        handleAddImage(e.dataTransfer.files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <UploadInner>
        <AiOutlineCloudDownload size={100} color={theme.colors.accent} />
        <FileInput>
          <input
            type='file'
            onChange={(e) => {
              e.preventDefault();
              handleAddImage(e.target.files);
            }}
            multiple
            max={3}
            accept='image/*'
          />
          <span>Escolher fotos</span>
        </FileInput>
      </UploadInner>
    </UploadContainer>
  );
};
export default ImageUploadComponent;
