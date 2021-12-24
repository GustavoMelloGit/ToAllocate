import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../../components';
import useAuth from '../../../hooks/useAuth';
import { AdminActionWrapper } from '../../styles';
import { ProjectsListContainer } from './styles';

const ProjectsList: React.FC = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate('/projects/create-project');
  };
  return (
    <AppLayoutComponent>
      <ProjectsListContainer>
        {user?.isadmin && (
          <AdminActionWrapper>
            <AdminButtonComponent onClick={handleCreateProject}>
              Criar
            </AdminButtonComponent>
            <AdminButtonComponent>Editar</AdminButtonComponent>
          </AdminActionWrapper>
        )}
      </ProjectsListContainer>
    </AppLayoutComponent>
  );
};
export default ProjectsList;
