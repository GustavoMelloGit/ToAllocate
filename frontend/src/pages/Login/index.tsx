import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { LoginLayoutComponent } from '../../components';
import InputComponent from '../../components/utils/Input';
import theme from '../../global/theme';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { validateForm } from '../../shared/helpers/formValidation';
import { FormWrapper, RedBox, SubmitButton, WhiteBox } from './styles';

export default function LoginPage() {
  const { width } = useWindowDimensions();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formIsValid = validateForm({
      email: emailInput,
      password: passwordInput,
    });
    if (!formIsValid) {
      toast.error('Preencha todos os campos corretamente');
      return;
    }
  }

  return (
    <LoginLayoutComponent>
      <WhiteBox>
        <h1>Lo</h1>
        <h2>ToAllocate</h2>
        <p>Menor trabalho, maior desenvolvimento</p>
      </WhiteBox>
      <RedBox>
        <h1>{width > parseInt(theme.screenSizes.md) ? 'gin' : 'Login'}</h1>
        <FormWrapper onSubmit={handleSubmit}>
          <InputComponent
            type='text'
            required
            placeholder='Usuário'
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <InputComponent
            type='password'
            required
            placeholder='Senha'
            value={passwordInput}
            onChangeText={setPasswordInput}
          />
          <SubmitButton type='submit'>Entrar</SubmitButton>
        </FormWrapper>
      </RedBox>
    </LoginLayoutComponent>
  );
}
