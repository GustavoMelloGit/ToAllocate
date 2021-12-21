import { InputHTMLAttributes } from 'react';
import { Container, InputLabel } from '../styles';
import { Input } from './styles';

interface IMyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (text: string) => void;
}

const MyInput: React.FC<IMyInputProps> = (props) => {
  const { children, ...rest } = props;
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeText) {
      props.onChangeText(e.target.value);
    }
  };
  return (
    <Container>
      <InputLabel htmlFor='MyInput'>{children}</InputLabel>
      <Input onChange={handleChangeText.bind(null)} id='MyInput' {...rest} />
    </Container>
  );
};
export default MyInput;
