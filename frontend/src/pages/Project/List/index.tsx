import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminButtonComponent, AppLayoutComponent } from '../../../components';
import NotFoundComponent from '../../../components/utils/NotFound';
import useAuth from '../../../hooks/useAuth';
import { IProjectModel } from '../../../models/project/ProjectModel';
import api from '../../../services/api';
import { AdminActionWrapper } from '../../styles';
import ProjectItem from './components/ProjectItem';
import SearchInput from './components/SearchInput';
import { ProjectsListContainer } from './styles';

const ProjectsList: React.FC = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProjectModel[]>([]);
  const [searchData, setSearchData] = useState('');

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
            <SearchInput onChange={setSearchData} value={searchData} />
          </AdminActionWrapper>
        )}
        {projects.length > 0 ? (
          <ul>
            {projects
              .filter((project) =>
                project.project_name
                  .toLowerCase()
                  .includes(searchData.toLowerCase())
              )
              .map((project, index) => (
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
