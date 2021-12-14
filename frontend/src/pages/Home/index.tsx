import { AppLayoutComponent } from '../../components';
import { ActionButtonsWrapper, HomeContainer } from './styles';
import { BiMenuAltRight, BiSearch } from 'react-icons/bi';
import { ButtonComponent, ProjectDetailComponent } from '../../components';

export default function HomePage(): JSX.Element {
  return (
    <AppLayoutComponent>
      <HomeContainer>
        <ActionButtonsWrapper>
          <ButtonComponent>
            <BiMenuAltRight className='icon' />
          </ButtonComponent>
          <ButtonComponent>
            <BiSearch className='icon' />
          </ButtonComponent>
        </ActionButtonsWrapper>
        <ProjectDetailComponent />
      </HomeContainer>
    </AppLayoutComponent>
  );
}
