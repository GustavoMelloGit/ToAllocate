import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../../components';
import theme from '../../../global/theme';
import useAuth from '../../../hooks/useAuth';
// import { DUMMY_PROJECTS } from '../../../mocks/projects';
import { IProjectModel } from '../../../models/project/ProjectModel';
import api from '../../../services/api';
import { AdminActionWrapper } from '../../styles';
import ProjectItem from './components/ProjectItem';
import { ProjectsListContainer } from './styles';

const ProjectsList: React.FC = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProjectModel[]>([]);

  const handleCreateProject = () => {
    navigate('/projects/create-project');
  };
  const handleItemClick = (id: string) => {
    navigate(`/project/${id}`);
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return (
      <AppLayoutComponent>
        <h1>Nenhum projeto encontrado</h1>
      </AppLayoutComponent>
    );
  }
  return (
    <AppLayoutComponent>
      <ProjectsListContainer>
        {user?.role === 'admin' && (
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
        <ul>
          {projects.map((project, index) => (
            <ProjectItem
              key={project.project_id}
              project={project}
              isReverse={index % 2 === 0}
              onClick={handleItemClick.bind(null, project.project_id)}
            />
          ))}
        </ul>
      </ProjectsListContainer>
    </AppLayoutComponent>
  );
};
export default ProjectsList;
