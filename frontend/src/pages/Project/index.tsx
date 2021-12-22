import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../components';
import api from '../../services/api';
import { AdminActionWrapper } from '../styles';
import { MyInput, MyTextArea } from './components';
import ImageUploadComponent from './components/ImageUpload';
import {
  ContentWrapper,
  FormInputsWrapper,
  ProjectContainer,
  ProjectForm,
} from './styles';

const ProjectFormPage: React.FC = (props) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/home');
  };

  const handleSubmit = async () => {
    try {
      api.post('/create-project', {
        project_name: name,
        start_date: new Date().toISOString,
        end_date: deadline,
        description,
        manager: '843a271f-8169-42c1-acb1-3e308d2432f7',
      });
      toast.success('Projeto criado com sucesso!');
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
          <ImageUploadComponent />
          <ContentWrapper>
            <ProjectForm onSubmit={handleSubmit}>
              <MyInput onChangeText={setName}>Nome*</MyInput>
              <MyInput onChangeText={setDeadline} type='date' max='2025-12-31'>
                Prazo*
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
