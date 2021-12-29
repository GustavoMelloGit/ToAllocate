import { LoadingWrapper } from './styles';

interface ILoadingComponentProps {
  color?: string;
}
export default function LoadingComponent(
  props: ILoadingComponentProps
): JSX.Element {
  const { color } = props;
  return <LoadingWrapper color={color} />;
}
