import React from 'react';
import { LoginLayoutComponent } from '../../components';
import InputComponent from '../../components/utils/Input';
import theme from '../../global/theme';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { FormWrapper, RedBox, SubmitButton, WhiteBox } from './styles';

export default function LoginPage() {
  const { width } = useWindowDimensions();

  return (
    <LoginLayoutComponent>
      <WhiteBox>
        <h1>Lo</h1>
        <h2>ToAllocate</h2>
        <p>Menor trabalho, maior desenvolvimento</p>
      </WhiteBox>
      <RedBox>
        <h1>{width > parseInt(theme.screenSizes.md) ? 'gin' : 'Login'}</h1>
        <FormWrapper>
          <InputComponent type='text' required placeholder='Usuário' />
          <InputComponent type='password' required placeholder='Senha' />
          <SubmitButton>Entrar</SubmitButton>
        </FormWrapper>
      </RedBox>
    </LoginLayoutComponent>
  );
}
