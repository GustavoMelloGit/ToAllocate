import React from 'react';
import { Container } from './styles';

interface ILoginLayoutComponent {
  children: React.ReactNode;
}

export default function LoginLayoutComponent(props: ILoginLayoutComponent) {
  const { children } = props;
  return <Container>{children}</Container>;
}
