import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AppLayoutComponent, LoadingComponent } from '../../../components';
import theme from '../../../global/theme';
import { IProjectEmployee } from '../../../models/project/ProjectEmployee';
import { IProjectModel } from '../../../models/project/ProjectModel';
import { IEmployeeModel } from '../../../models/user/employee';
import api from '../../../services/api';
import { formatDateRequest } from '../../../shared/helpers/formatters';
import ProjectForm from '../components/ProjectForm';

const EditProject: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployeeModel[]>();
  const [project, setProject] = useState<IProjectModel>();
  const [manager, setManager] = useState<IProjectEmployee>();
  const [loading, setLoading] = useState(true);
  const { uuid } = useParams();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      const project = await api.get(`/project/${uuid}`);
      setProject(project.data);
      const employees = await api.get('/employees');
      setEmployees(employees.data.employees);

      setManager(
        project.data.employees.find((e: any) => e.ocuppation === 'manager')
      );
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleEditProject = async (values: any) => {
    const formatedEndDate = formatDateRequest(values.endDate);
    const formData = new FormData();
    if (project?.project_name !== values.name) {
      formData.append('project_name', values.name);
    }

    formData.append('end_date', formatedEndDate);
    formData.append('cost', values.cost.toString());
    formData.append('description', values.description);
    formData.append('manager', values.manager);
    if (values.employees) {
      for (let i = 0; i < values.employees.length; i++) {
        formData.append('employees', values.employees[i]);
      }
    }

    try {
      await api.put(`/update-project/${uuid}`, formData);
      toast.success('Projeto editado com sucesso!');
      navigate(-1);
    } catch (e: any) {
      console.log(e.message);
      toast.error('Erro ao criar projeto!');
    }
  };

  if (loading || !employees || !project || !manager) {
    return (
      <AppLayoutComponent>
        <LoadingComponent color={theme.colors.accent} />
      </AppLayoutComponent>
    );
  }
  return (
    <AppLayoutComponent>
      <ProjectForm
        onSubmit={handleEditProject}
        employees={employees}
        editing
        initialValues={{
          id: project.project_id,
          name: project.project_name,
          description: project.description,
          endDate: project.end_date,
          startDate: project.start_date,
          cost: project.cost,
          manager: manager.employee_cpf,
          images: project.images,
          employees: project.employees.map((e) => e.employee_cpf),
        }}
      />
    </AppLayoutComponent>
  );
};
export default EditProject;
