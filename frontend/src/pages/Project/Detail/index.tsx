import { ActionButtonsWrapper, HomeContainer } from './styles';
import { BiMenuAltRight, BiSearch } from 'react-icons/bi';
import {
  ButtonComponent,
  ProjectDetailComponent,
  AdminButtonComponent,
  AppLayoutComponent,
} from '../../../components';
import useAuth from '../../../hooks/useAuth';
import { AdminActionWrapper } from '../../styles';
import { useNavigate } from 'react-router-dom';

export default function ProjectDetail(): JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();
  const { user } = auth;

  const handleCreateProject = (): void => {
    navigate('/project');
  };

  return (
    <AppLayoutComponent>
      <HomeContainer>
        <ActionButtonsWrapper>
          <ButtonComponent>
            <BiMenuAltRight className='icon' />
          </ButtonComponent>
          {user?.isadmin && (
            <AdminActionWrapper>
              <AdminButtonComponent onClick={handleCreateProject}>
                Criar
              </AdminButtonComponent>
              <AdminButtonComponent>Editar</AdminButtonComponent>
            </AdminActionWrapper>
          )}
          <ButtonComponent>
            <BiSearch className='icon' />
          </ButtonComponent>
        </ActionButtonsWrapper>
        <ProjectDetailComponent />
      </HomeContainer>
    </AppLayoutComponent>
  );
}
