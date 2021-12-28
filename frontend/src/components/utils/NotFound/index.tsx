import React from 'react';
import { NotFoundContainer } from './styles';

interface INotFoundProps {
  message?: string;
}

const NotFoundComponent: React.FC<INotFoundProps> = (props) => {
  const { message = 'Não encontrado' } = props;

  return (
    <NotFoundContainer>
      <p>{message}</p>
    </NotFoundContainer>
  );
};

export default NotFoundComponent;
