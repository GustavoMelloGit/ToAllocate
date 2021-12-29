import { Container, InputLabel } from '../styles';
import { TextArea } from './styles';

interface IMyTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChangeText?: (text: string) => void;
}
const MyTextArea: React.FC<IMyTextAreaProps> = (props) => {
  const { children, ...rest } = props;
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChangeText) {
      props.onChangeText(e.target.value);
    }
  };
  return (
    <Container>
      <InputLabel htmlFor='DescriptionTextArea'>{children}</InputLabel>
      <TextArea
        onChange={handleChangeText}
        id='DescriptionTextArea'
        {...rest}
      />
    </Container>
  );
};
export default MyTextArea;
