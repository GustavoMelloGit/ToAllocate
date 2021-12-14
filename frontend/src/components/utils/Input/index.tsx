import { InputHTMLAttributes } from 'react';
import { Input } from './styles';

interface IInputComponent extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputComponent(props: IInputComponent) {
  const { value, onChangeText, ...rest } = props;
  return (
    <Input
      {...rest}
      onChange={(e) => onChangeText(e.currentTarget.value)}
      value={value}
    />
  );
}
