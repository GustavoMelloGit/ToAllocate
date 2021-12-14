//Utils
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { ILoginAuthenticationForm } from '../../models/authentication/form';
import { validateForm } from '../../shared/helpers/formValidation';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

//Components
import {
  LoginLayoutComponent,
  InputComponent,
  LoadingComponent,
} from '../../components';

//Styles
import theme from '../../global/theme';
import { FormWrapper, RedBox, SubmitButton, WhiteBox } from './styles';

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { login } = useAuth();

  function clearInputs() {
    setEmailInput('');
    setPasswordInput('');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const userEntry: ILoginAuthenticationForm = {
      email: emailInput,
      password: passwordInput,
    };
    const formIsValid = validateForm(userEntry);

    if (!formIsValid) {
      toast.error('Preencha todos os campos corretamente');
      setIsLoading(false);
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
    }
    setIsLoading(false);
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
        {isLoading ? (
          <LoadingComponent />
        ) : (
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
        )}
      </RedBox>
    </LoginLayoutComponent>
  );
}
