import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../../components';
import api from '../../../services/api';
import { AdminActionWrapper } from '../../styles';
import { MyInput, MyTextArea } from './components';
import ImageUploadComponent from './components/ImageUpload';
import {
  ContentWrapper,
  FormInputsWrapper,
  ProjectContainer,
  ProjectForm,
} from './styles';
import { formatCPF, formatDate } from '../../../shared/helpers/formatters';

const ProjectFormPage: React.FC = (props) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileList>();
  const [startDate, setStartDate] = useState('');
  const [cost, setCost] = useState('');
  const [managerCPF, setManagerCPF] = useState('');

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCPFChange = (text: string) => {
    if (text.length <= 14) {
      setManagerCPF(formatCPF(text));
    }
  };

  const handleSubmit = async () => {
    const formatStartDate = formatDate(startDate);
    const formatDeadline = formatDate(deadline);
    const formData = new FormData();
    formData.append('project_name', name);
    formData.append('start_date', formatStartDate);
    formData.append('end_date', formatDeadline);
    formData.append('cost', cost);
    formData.append('description', description);
    formData.append('manager', 'cdf54f90-a236-4d39-aa8d-dc53a981d8d5');
    formData.forEach((key) => console.log(key));
    try {
      await api.post('/create-project', formData);
      toast.success('Projeto cadastrado com sucesso!');
    } catch (e) {
      console.log(e);
      toast.error('Erro ao criar projeto!');
    }
  };

  return (
    <AppLayoutComponent>
      <ProjectContainer>
        <AdminActionWrapper>
          <AdminButtonComponent onClick={handleCancel}>
            Cancelar
          </AdminButtonComponent>
          <AdminButtonComponent onClick={handleSubmit}>
            Salvar
          </AdminButtonComponent>
        </AdminActionWrapper>
        <FormInputsWrapper>
          <ImageUploadComponent images={images} setImages={setImages} />
          <ContentWrapper>
            <ProjectForm id='test' onSubmit={handleSubmit}>
              <MyInput onChangeText={setName}>Nome*</MyInput>
              <MyInput onChangeText={setStartDate} type='date' max='2025-12-31'>
                Data de início*
              </MyInput>
              <MyInput onChangeText={setDeadline} type='date' max='2025-12-31'>
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
            </ProjectForm>
          </ContentWrapper>
        </FormInputsWrapper>
      </ProjectContainer>
    </AppLayoutComponent>
  );
};

export default ProjectFormPage;
