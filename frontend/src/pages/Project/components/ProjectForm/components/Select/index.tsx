import React from 'react';
import { IEmployeeModel } from '../../../../../../models/user/employee';
import { Container, InputLabel } from '../styles';
import { OptionContainer, SelectContainer } from './styles';

interface IMySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  employees: IEmployeeModel[];
  label: string;
  setValue: (value: string) => void;
}

const MySelect: React.FC<IMySelectProps> = (props) => {
  const { employees, label, setValue, ...rest } = props;

  return (
    <Container>
      <InputLabel htmlFor='MySelect'>{label}</InputLabel>
      <SelectContainer
        id='MySelect'
        onChange={(e) => setValue(e.target.value)}
        defaultValue={''}
        {...rest}
      >
        <OptionContainer value='' disabled>
          Selecione um funcionário
        </OptionContainer>
        {employees.map((employee) => (
          <OptionContainer key={employee.id} value={employee.cpf}>
            {employee.fname} {employee.lname}
          </OptionContainer>
        ))}
      </SelectContainer>
    </Container>
  );
};
export default MySelect;
