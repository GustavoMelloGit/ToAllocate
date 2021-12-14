import React from 'react';
import { HeaderContainer } from './styles';
import LogoutButtonComponent from './sub_components/LogoutButton';

interface IHeaderComponent {
  title: string;
}

export default function HeaderComponent(props: IHeaderComponent): JSX.Element {
  const { title } = props;
  return (
    <HeaderContainer>
      <LogoutButtonComponent title='Logout' />
      <h1>{title}</h1>
    </HeaderContainer>
  );
}
