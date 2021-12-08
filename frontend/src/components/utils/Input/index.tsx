import React, { InputHTMLAttributes } from 'react';
import { Input } from './styles';

interface IInputComponent extends InputHTMLAttributes<HTMLInputElement> {}
export default function InputComponent(props: IInputComponent) {
  const { ...rest } = props;
  return <Input {...rest} />;
}
