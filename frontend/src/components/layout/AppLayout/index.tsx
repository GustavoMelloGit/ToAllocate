import React from 'react';
import HeaderComponent from '../Header';
import { Container, Content, ContentWrapper } from './styles';

interface IAppLayoutComponent {
  children: React.ReactNode;
}
export default function AppLayoutComponent(props: IAppLayoutComponent) {
  const { children } = props;

  return (
    <Container>
      <HeaderComponent title='Projetos' />
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
    </Container>
  );
}
