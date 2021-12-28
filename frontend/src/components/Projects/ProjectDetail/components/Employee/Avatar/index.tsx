import { IProjectEmployeeModel } from '../../../../../../models/project/ProjectModel';
import { AvatarContent, AvatarWrapper } from './styles';

interface IAvatarComponent {
  employee: IProjectEmployeeModel;
}

const AvatarComponent: React.FC<IAvatarComponent> = (props) => {
  const { employee } = props;

  return (
    <AvatarWrapper>
      <AvatarContent>
        <h1>{employee.name[0]}</h1>
      </AvatarContent>
    </AvatarWrapper>
  );
};
export default AvatarComponent;
