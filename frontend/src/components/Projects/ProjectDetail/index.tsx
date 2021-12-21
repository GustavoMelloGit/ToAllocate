import { IProjectModel } from '../../../models/project/ProjectModel';
import { IEmployeeModel } from '../../../models/user/employee';
import CarouselComponent from './components/Carousel';
import EmployeeItem from './components/Employee/EmployeeItem';
import {
  ContentHeaderWrapper,
  ContentWrapper,
  EmployeesWrapper,
  ProjectDetail,
  ProjectDetailComponentContainer,
} from './styles';

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

const DUMMY_EMPLOYEE: IEmployeeModel[] = [
  {
    id: '1',
    fname: 'John',
    lname: 'Doe',
    email: 'email@email.com',
    role: 'Project Manager',
    avatar:
      'data:image/jpeg;base64,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',
    isadmin: false,
  },
  {
    id: '2',
    fname: 'Dave',
    lname: 'Jhones',
    email: 'email@email.com',
    role: 'Project Manager',
    avatar:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    isadmin: false,
  },
];

export default function ProjectDetailComponent(): JSX.Element {
  return (
    <ProjectDetailComponentContainer>
      <CarouselComponent projects={DUMMY_PRODUCTS} />
      <ContentWrapper>
        <ProjectDetail>
          <ContentHeaderWrapper>
            <h1>Project Name</h1>
            <span>Prazo: 05/10/2021</span>
          </ContentHeaderWrapper>
          <p>
            Lorem ipsum dolor sit amet. Hic nulla perspiciatis vel illo nihil
            cum laudantium maxime sed asperiores voluptatem. Qui voluptate
            dolorem est quos dolor in sunt delectus in internos voluptate. Et
            dolores voluptates est dolores voluptas sed laborum esse est iste
            autem ut officiis dolore. Eos velit nostrum et molestiae debitis aut
            dolorem totam in omnis error ea sint autem ut iusto molestias in
            officiis reiciendis! Et facilis sint et quia dicta ut distinctio
            placeat sed enim veritatis ad possimus necessitatibus. Nam unde
            voluptatem At nobis iusto in nesciunt omnis et ratione molestias et
            magni animi et repellendus voluptatem ut consequatur rerum. Eum
            nesciunt ipsa ut unde vero ab cumque maxime non fugiat iste in
            delectus aperiam qui temporibus porro! Qui maiores rerum sed
            consequatur asperiores sed amet praesentium! Lorem ipsum dolor sit
            amet. Hic nulla perspiciatis vel illo nihil cum laudantium maxime
            sed asperiores voluptatem. Qui voluptate dolorem est quos dolor in
            sunt delectus in internos voluptate. Et dolores voluptates est
            dolores voluptas sed laborum esse est iste autem ut officiis dolore.
            Eos velit nostrum et molestiae debitis aut dolorem totam in omnis
            error ea sint autem ut iusto molestias in officiis reiciendis! Et
            facilis sint et quia dicta ut distinctio placeat sed enim veritatis
            ad possimus necessitatibus. Nam unde voluptatem At nobis iusto in
            nesciunt omnis et ratione molestias et magni animi et repellendus
            voluptatem ut consequatur rerum. Eum nesciunt ipsa ut unde vero ab
            cumque maxime non fugiat iste in delectus aperiam qui temporibus
            porro! Qui maiores rerum sed consequatur asperiores sed amet
            praesentium!
          </p>
        </ProjectDetail>
        <EmployeesWrapper>
          {DUMMY_EMPLOYEE.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))}
        </EmployeesWrapper>
      </ContentWrapper>
    </ProjectDetailComponentContainer>
  );
}
