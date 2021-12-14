import { IProjectModel } from '../../../models/project/ProjectModel';
import CarouselComponent from './components/Carousel';
import { ProjectDetailComponentContainer } from './styles';

const DUMMY_PRODUCTS: IProjectModel[] = [
  {
    id: 1,
    name: 'Project Name1',
    description: 'Project Description',
    image: ['https://via.placeholder.com/300x300'],
  },
  {
    id: 2,
    name: 'Project Name2',
    description: 'Project Description',
    image: ['https://via.placeholder.com/300x300'],
  },
  {
    id: 3,
    name: 'Project Name3',
    description: 'Project Description',
    image: ['https://via.placeholder.com/300x300'],
  },
  {
    id: 4,
    name: 'Project Name4',
    description: 'Project Description',
    image: ['https://via.placeholder.com/300x300'],
  },
];

export default function ProjectDetailComponent(): JSX.Element {
  return (
    <ProjectDetailComponentContainer>
      <CarouselComponent projects={DUMMY_PRODUCTS} />
    </ProjectDetailComponentContainer>
  );
}
