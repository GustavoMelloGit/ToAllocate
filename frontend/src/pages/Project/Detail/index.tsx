import { ActionButtonsWrapper, HomeContainer } from './styles';
import { BiMenuAltRight } from 'react-icons/bi';
import {
  ButtonComponent,
  ProjectDetailComponent,
  AdminButtonComponent,
  AppLayoutComponent,
} from '../../../components';
import useAuth from '../../../hooks/useAuth';
import { AdminActionWrapper } from '../../styles';
import { useNavigate, useParams } from 'react-router-dom';
import { IProjectModel } from '../../../models/project/ProjectModel';
import { useEffect, useState } from 'react';
import api from '../../../services/api';

export default function ProjectDetail(): JSX.Element {
  const [project, setProject] = useState<IProjectModel>({} as IProjectModel);
  const auth = useAuth();
  const navigate = useNavigate();
  const { user } = auth;
  const { uuid } = useParams();

  useEffect(() => {
    const getDataById = async () => {
      try {
        const response = await api.get(`/project/${uuid}`);
        console.log(response.data);
        setProject(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getDataById();
  }, [uuid]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AppLayoutComponent>
      <HomeContainer>
        <ActionButtonsWrapper>
          <ButtonComponent onClick={handleGoBack}>
            <BiMenuAltRight className='icon' />
          </ButtonComponent>
          {user?.role === 'admin' && (
            <AdminActionWrapper>
              <AdminButtonComponent>Editar</AdminButtonComponent>
            </AdminActionWrapper>
          )}
        </ActionButtonsWrapper>
        <ProjectDetailComponent project={project} />
      </HomeContainer>
    </AppLayoutComponent>
  );
}
