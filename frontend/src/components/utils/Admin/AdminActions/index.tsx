import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

const AdminButtonComponent: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> =
  (props) => {
    const { children, disabled, ...rest } = props;
    return (
      <ButtonContainer disabled={disabled} {...rest}>
        {children}
      </ButtonContainer>
    );
  };
export default AdminButtonComponent;
