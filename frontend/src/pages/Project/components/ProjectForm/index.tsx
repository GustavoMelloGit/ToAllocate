import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent } from '../../../../components';
import { IEmployeeModel } from '../../../../models/user/employee';
import { MyInput, MyTextArea, MySelect } from './components';
import ImageUploadComponent from './components/ImageUpload';
import { ContentWrapper, Form, FormInputsWrapper } from './styles';

export interface IProjectFormValues {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  cost: number;
  manager: string;
  employees: string[];
  images: FileList | string[];
}

const formatDate = (date: string) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

interface IProjectFormProps {
  onSubmit: (values: any) => void;
  initialValues: IProjectFormValues;
  employees: IEmployeeModel[];
  editing?: boolean;
}

const ProjectForm: React.FC<IProjectFormProps> = (props) => {
  const { onSubmit, initialValues, employees, editing } = props;
  const navigate = useNavigate();

  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [startDate, setStartDate] = useState(
    formatDate(initialValues.startDate)
  );
  const [endDate, setEndDate] = useState(formatDate(initialValues.endDate));
  const [images, setImages] = useState<any>(initialValues.images);
  const [cost, setCost] = useState(initialValues.cost.toString());
  const [manager, setManager] = useState(initialValues.manager);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>();

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !description || !startDate || !endDate || !cost || !manager) {
      toast.error('Preencha todos os campos!');
      return;
    }
    onSubmit({
      id: initialValues.id,
      name,
      description,
      images: images,
      startDate,
      endDate,
      cost,
      manager: manager,
      employees: selectedEmployees,
    });
  };

  const handleAddEmployee = (employee_cpf: string) => {
    if (!selectedEmployees) {
      setSelectedEmployees([employee_cpf]);
    } else {
      if (selectedEmployees.includes(employee_cpf)) {
        const newSelectedEmployees = selectedEmployees.filter(
          (employee) => employee !== employee_cpf
        );
        setSelectedEmployees(newSelectedEmployees);
        return;
      }
      setSelectedEmployees([...selectedEmployees, employee_cpf]);
    }
  };

  return (
    <FormInputsWrapper>
      <ImageUploadComponent
        disabled={editing}
        images={images}
        setImages={setImages}
      />
      <ContentWrapper>
        <Form onSubmit={handleSubmit}>
          <MyInput onChangeText={setName} value={name}>
            Nome*
          </MyInput>
          <MyInput
            onChangeText={setStartDate}
            value={startDate}
            type='date'
            max='2025-12-31'
            disabled={editing}
          >
            Data de início*
          </MyInput>
          <MyInput
            onChangeText={setEndDate}
            value={endDate}
            type='date'
            max='2025-12-31'
          >
            Data de término*
          </MyInput>
          <MyInput onChangeText={setCost} value={cost} type='number'>
            Valor*
          </MyInput>
          <MySelect
            employees={employees}
            label='Gerente*'
            setValue={setManager}
            value={manager}
          />
          <MySelect
            employees={employees}
            label='Funcionários*'
            setValue={handleAddEmployee}
            value={selectedEmployees}
            multiple
          />
          <MyTextArea onChangeText={setDescription} value={description}>
            Descrição*
          </MyTextArea>
          <AdminButtonComponent onClick={handleCancel}>
            Cancelar
          </AdminButtonComponent>
          <AdminButtonComponent type='submit'>Salvar</AdminButtonComponent>
        </Form>
      </ContentWrapper>
    </FormInputsWrapper>
  );
};
export default ProjectForm;
