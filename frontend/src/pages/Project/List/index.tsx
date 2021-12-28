import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../../components';
import NotFoundComponent from '../../../components/utils/NotFound';
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
        {projects.length > 0 ? (
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
        ) : (
          <NotFoundComponent message='Nenhum projeto encontrado' />
        )}
      </ProjectsListContainer>
    </AppLayoutComponent>
  );
};
export default ProjectsList;
