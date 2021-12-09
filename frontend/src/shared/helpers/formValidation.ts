import { ILoginAuthenticationForm } from '../../models/authentication/form';

function validateEmail(email: string) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function validatePassword(password: string) {
  return password.length >= 6;
}

function validateForm({ email, password }: ILoginAuthenticationForm): boolean {
  return validateEmail(email) && validatePassword(password);
}

export { validateForm };
