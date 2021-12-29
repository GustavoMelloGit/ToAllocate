import { IProjectEmployeeModel } from '../../../../../../models/project/ProjectModel';
import AvatarComponent from '../Avatar';
import { EmployeeInfo, EmployeeItemWrapper } from './styles';

interface IEmployeeItem {
  employee: IProjectEmployeeModel;
}

const EmployeeItem: React.FC<IEmployeeItem> = (props) => {
  const { employee } = props;

  return (
    <EmployeeItemWrapper>
      <AvatarComponent employee={employee} />
      <EmployeeInfo>
        <h1>{employee.name}</h1>
        <span>{employee.ocuppation}</span>
      </EmployeeInfo>
    </EmployeeItemWrapper>
  );
};
export default EmployeeItem;
