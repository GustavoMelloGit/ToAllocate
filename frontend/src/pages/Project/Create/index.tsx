import toast from 'react-hot-toast';
import api from '../../../services/api';
import { ProjectContainer } from './styles';
import { formatDateRequest } from '../../../shared/helpers/formatters';
import ProjectForm, { IProjectFormValues } from '../components/ProjectForm';
import { AppLayoutComponent } from '../../../components';
import { useEffect, useState } from 'react';
import { IEmployeeModel } from '../../../models/user/employee';
import { useNavigate } from 'react-router-dom';

const initialValues: IProjectFormValues = {
  id: '',
  name: '',
  description: '',
  endDate: '',
  startDate: '',
  cost: 0,
  manager: '',
  images: {} as FileList,
};

const ProjectFormPage: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployeeModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      const response = await api.get('/employees');
      setEmployees(response.data.employees);
    };
    getEmployees();
  }, []);

  const handleSubmit = async (props: IProjectFormValues) => {
    const { startDate, endDate, name, cost, description, manager, images } =
      props;
    const formatStartDate = formatDateRequest(startDate);
    const formatDeadline = formatDateRequest(endDate);
    const formData = new FormData();

    formData.append('project_name', name);
    formData.append('start_date', formatStartDate);
    formData.append('end_date', formatDeadline);
    formData.append('cost', cost.toString());
    formData.append('description', description);
    formData.append('manager', manager);
    for (let i = 0; i < images.length; i++) {
      formData.append('file', images[i]);
    }

    try {
      await api.post('/create-project', formData);
      toast.success('Projeto cadastrado com sucesso!');
      navigate(-1);
    } catch (e) {
      console.log(e);
      toast.error('Erro ao criar projeto!');
    }
  };

  return (
    <AppLayoutComponent>
      <ProjectContainer>
        <ProjectForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          employees={employees}
        />
      </ProjectContainer>
    </AppLayoutComponent>
  );
};

export default ProjectFormPage;
