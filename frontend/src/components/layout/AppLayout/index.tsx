import React from 'react';
import { Container } from './styles';

interface IAppLayoutComponent {
  children: React.ReactNode;
}
export default function AppLayoutComponent(props: IAppLayoutComponent) {
  const { children } = props;

  return <Container>{children}</Container>;
}
