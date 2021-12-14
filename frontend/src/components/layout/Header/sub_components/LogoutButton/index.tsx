import React, { ButtonHTMLAttributes } from 'react';
import { LogoutButton } from './styles';
import { FiLogOut } from 'react-icons/fi';

interface ILogoutButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}
export default function LogoutButtonComponent(
  props: ILogoutButton
): JSX.Element {
  const { title, ...rest } = props;
  return (
    <LogoutButton {...rest}>
      <h3>{title}</h3>
      <FiLogOut />
    </LogoutButton>
  );
}
