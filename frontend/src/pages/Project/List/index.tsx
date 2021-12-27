import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../../components';
import theme from '../../../global/theme';
import useAuth from '../../../hooks/useAuth';
import { DUMMY_PROJECTS } from '../../../mocks/projects';
import { AdminActionWrapper } from '../../styles';
import ProjectItem from './components/ProjectItem';
import { ProjectsListContainer } from './styles';

const ProjectsList: React.FC = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate('/projects/create-project');
  };
  const handleItemClick = (id: string) => {
    navigate(`/project/${id}`);
  };
  return (
    <AppLayoutComponent>
      <ProjectsListContainer>
        {user?.isadmin && (
          <AdminActionWrapper>
            <AdminButtonComponent onClick={handleCreateProject}>
              Criar
            </AdminButtonComponent>
            <button>
              <BiSearchAlt
                size={30}
                color={theme.colors.accent}
                className='pointer'
              />
            </button>
          </AdminActionWrapper>
        )}
        {DUMMY_PROJECTS.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            isReverse={index % 2 === 0}
            onClick={handleItemClick.bind(null, project.id)}
          />
        ))}
      </ProjectsListContainer>
    </AppLayoutComponent>
  );
};
export default ProjectsList;
