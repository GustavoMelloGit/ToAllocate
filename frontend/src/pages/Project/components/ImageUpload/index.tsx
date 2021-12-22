import { useState } from 'react';
import { Text, UploadContainer, UploadInner } from './styles';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import theme from '../../../../global/theme';
import { AdminButtonComponent } from '../../../../components';

const ImageUploadComponent: React.FC = (props) => {
  const [image, setImage] = useState([]);

  const handleAddImage = (imageList: []) => {
    setImage(imageList as never[]);
  };

  const handleClearImages = () => {
    setImage([]);
  };
  return (
    <UploadContainer>
      <UploadInner>
        <AiOutlineCloudDownload size={100} color={theme.colors.accent} />
        <AdminButtonComponent>Escolher fotos</AdminButtonComponent>
      </UploadInner>
    </UploadContainer>
  );
};
export default ImageUploadComponent;
