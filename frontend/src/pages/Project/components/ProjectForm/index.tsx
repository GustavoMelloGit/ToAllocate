import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent } from '../../../../components';
import { formatCPF } from '../../../../shared/helpers/formatters';
import { MyInput, MyTextArea } from './components';
import ImageUploadComponent from './components/ImageUpload';
import { ContentWrapper, Form, FormInputsWrapper } from './styles';

export interface IProjectFormValues {
  id: string;
  name: string;
  description: string;
  image: string[];
  startDate: string;
  endDate: string;
  cost: number;
  manager: string;
}

interface IProjectFormProps {
  onSubmit: (values: any) => void;
  initialValues: IProjectFormValues;
}

const ProjectForm: React.FC<IProjectFormProps> = (props) => {
  const { onSubmit, initialValues } = props;
  const navigate = useNavigate();
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [endDate, setEndDate] = useState(initialValues.endDate);
  const [images, setImages] = useState<FileList>();
  const [cost, setCost] = useState(initialValues.cost.toString());
  const [managerCPF, setManagerCPF] = useState(initialValues.manager);

  const handleCPFChange = (text: string) => {
    if (text.length <= 14) {
      setManagerCPF(formatCPF(text));
    }
  };
  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !startDate ||
      !endDate ||
      !cost ||
      !managerCPF
    ) {
      toast.error('Preencha todos os campos!');
      return;
    }

    onSubmit({
      id: initialValues.id,
      name,
      description,
      image: images,
      startDate,
      endDate,
      cost,
      manager: managerCPF,
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
          <MyInput
            onChangeText={handleCPFChange}
            value={managerCPF}
            type='text'
          >
            CPF do gerente*
          </MyInput>
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
