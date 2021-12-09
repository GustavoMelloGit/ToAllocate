import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { LoginLayoutComponent } from '../../components';
import InputComponent from '../../components/utils/Input';
import theme from '../../global/theme';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ILoginAuthenticationForm } from '../../models/authentication/form';
import { validateForm } from '../../shared/helpers/formValidation';
import { FormWrapper, RedBox, SubmitButton, WhiteBox } from './styles';
import { useAuth } from '../../shared/context/user';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { login } = useAuth();

  function clearInputs() {
    setEmailInput('');
    setPasswordInput('');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const userEntry: ILoginAuthenticationForm = {
      email: emailInput,
      password: passwordInput,
    };
    const formIsValid = validateForm(userEntry);

    if (!formIsValid) {
      toast.error('Preencha todos os campos corretamente');
      return;
    }
    try {
      await login(userEntry, () => {
        navigate('/home', { replace: true });
      });
      clearInputs();
      toast.success('Login realizado com sucesso');
    } catch (e: any) {
      toast.error(e.message);
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
            type='email'
            required
            placeholder='Email'
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
