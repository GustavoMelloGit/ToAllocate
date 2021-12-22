import { IEmployeeModel } from '../../../../../../models/user/employee';
import AvatarComponent from '../Avatar';
import { EmployeeInfo, EmployeeItemWrapper } from './styles';

interface IEmployeeItem {
  employee: IEmployeeModel;
}

const EmployeeItem: React.FC<IEmployeeItem> = (props) => {
  const { employee } = props;
  return (
    <EmployeeItemWrapper>
      <AvatarComponent employee={employee} />
      <EmployeeInfo>
        <h1>
          {employee.Fname} {employee.Lname}
        </h1>
        <span>{employee.role}</span>
      </EmployeeInfo>
    </EmployeeItemWrapper>
  );
};
export default EmployeeItem;
