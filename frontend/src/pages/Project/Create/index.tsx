import toast from 'react-hot-toast';
import api from '../../../services/api';
import { ProjectContainer } from './styles';
import { formatDateRequest } from '../../../shared/helpers/formatters';
import ProjectForm, { IProjectFormValues } from '../components/ProjectForm';
import { AppLayoutComponent } from '../../../components';

const initialValues: IProjectFormValues = {
  id: '',
  name: '',
  description: '',
  image: [],
  endDate: '',
  startDate: '',
  cost: 0,
  manager: '',
};

const ProjectFormPage: React.FC = () => {
  const handleSubmit = async (props: any) => {
    const { startDate, endDate, name, cost, description } = props;
    const formatStartDate = formatDateRequest(startDate);
    const formatDeadline = formatDateRequest(endDate);
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
        <ProjectForm onSubmit={handleSubmit} initialValues={initialValues} />
      </ProjectContainer>
    </AppLayoutComponent>
  );
};

export default ProjectFormPage;
