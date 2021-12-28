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
  images: FileList;
}

interface IProjectFormProps {
  onSubmit: (values: any) => void;
  initialValues: IProjectFormValues;
  employees: IEmployeeModel[];
}

const ProjectForm: React.FC<IProjectFormProps> = (props) => {
  const { onSubmit, initialValues, employees } = props;

  const navigate = useNavigate();
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [endDate, setEndDate] = useState(initialValues.endDate);
  const [images, setImages] = useState<FileList>();
  const [cost, setCost] = useState(initialValues.cost.toString());
  const [manager, setManager] = useState(initialValues.manager);

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
    });
  };

  return (
    <FormInputsWrapper>
      <ImageUploadComponent images={images} setImages={setImages} />
      <ContentWrapper>
        <Form onSubmit={handleSubmit}>
          <MyInput onChangeText={setName}>Nome*</MyInput>
          <MyInput onChangeText={setStartDate} type='date' max='2025-12-31'>
            Data de início*
          </MyInput>
          <MyInput onChangeText={setEndDate} type='date' max='2025-12-31'>
            Data de término*
          </MyInput>
          <MyInput onChangeText={setCost} type='number'>
            Valor*
          </MyInput>
          <MySelect
            employees={employees}
            label='Gerente*'
            setValue={setManager}
          />
          <MyTextArea onChangeText={setDescription}>Descrição*</MyTextArea>
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
