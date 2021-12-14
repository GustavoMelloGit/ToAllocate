import React, { ButtonHTMLAttributes } from 'react';
import { Button } from './styles';

interface IButtonComponent extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  filled?: boolean;
}
export default function ButtonComponent(props: IButtonComponent) {
  const { children, filled = false, ...rest } = props;
  return (
    <Button filled={filled} {...rest}>
      {children}
    </Button>
  );
}
