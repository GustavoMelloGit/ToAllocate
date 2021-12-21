import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { HeaderContainer } from './styles';
import LogoutButtonComponent from './sub_components/LogoutButton';

interface IHeaderComponent {
  title: string;
}

export default function HeaderComponent(props: IHeaderComponent): JSX.Element {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };
  const { title } = props;
  return (
    <HeaderContainer>
      <LogoutButtonComponent title='Logout' onClick={handleLogout} />
      <h1>{title}</h1>
    </HeaderContainer>
  );
}
