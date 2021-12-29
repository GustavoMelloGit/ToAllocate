import { LoadingComponent } from '../..';
import { IProjectModel } from '../../../models/project/ProjectModel';
import {
  formatDate,
  formatRealCurrency,
} from '../../../shared/helpers/formatters';
import CarouselComponent from './components/Carousel';
import EmployeeItem from './components/Employee/EmployeeItem';
import {
  ContentHeaderWrapper,
  ContentWrapper,
  EmployeesWrapper,
  ProjectDetail,
  ProjectDetailComponentContainer,
} from './styles';

interface IProjectDetailComponent {
  project: IProjectModel;
}

export default function ProjectDetailComponent(
  props: IProjectDetailComponent
): JSX.Element {
  const { project } = props;

  if (Object.keys(project).length === 0) {
    return <LoadingComponent />;
  }

  const images = project.images;

  return (
    <ProjectDetailComponentContainer>
      <CarouselComponent images={images} />
      <ContentWrapper>
        <ProjectDetail>
          <ContentHeaderWrapper>
            <h1>{project.project_name}</h1>
            <span>Prazo: {formatDate(project.end_date)}</span>
            <span>Valor: {formatRealCurrency(project.cost)}</span>
          </ContentHeaderWrapper>
          <p>{project.description}</p>
        </ProjectDetail>
        <EmployeesWrapper>
          {project.employees.map((employee) => (
            <EmployeeItem key={employee.name} employee={employee} />
          ))}
        </EmployeesWrapper>
      </ContentWrapper>
    </ProjectDetailComponentContainer>
  );
}
