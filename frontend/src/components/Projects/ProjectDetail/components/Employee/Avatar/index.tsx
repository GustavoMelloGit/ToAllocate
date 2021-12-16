import { IEmployeeModel } from '../../../../../../models/user/employee';
import { AvatarContent, AvatarWrapper } from './styles';

interface IAvatarComponent {
  employee: IEmployeeModel;
}

const AvatarComponent: React.FC<IAvatarComponent> = (props) => {
  const { employee } = props;

  return (
    <AvatarWrapper>
      <AvatarContent>
        {employee.avatar ? (
          <img src={employee.avatar} alt={employee.fname} />
        ) : (
          <h1>{employee.fname[0]}</h1>
        )}
      </AvatarContent>
    </AvatarWrapper>
  );
};
export default AvatarComponent;
