import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

const AdminButtonComponent: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> =
  (props) => {
    const { children, ...rest } = props;
    return <ButtonContainer {...rest}>{children}</ButtonContainer>;
  };
export default AdminButtonComponent;
