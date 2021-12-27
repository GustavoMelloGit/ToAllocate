import React from 'react';
import { IProjectModel } from '../../../../../models/project/ProjectModel';
import { formatDate } from '../../../../../shared/helpers/formatters';
import {
  ContentWrapper,
  ProjectItemContainer,
  ProjectItemInfo,
} from './styles';

export interface IProjectItemProps {
  project: IProjectModel;
  isReverse?: boolean;
  onClick?: () => void;
}

const ProjectItem: React.FC<IProjectItemProps> = (props) => {
  const { isReverse = false, project, onClick } = props;
  console.log(project);
  return (
    <ProjectItemContainer onClick={onClick}>
      <ContentWrapper>
        {isReverse ? (
          <>
            <img src={project.images[0]} alt={project.project_name} />
            <ProjectItemInfo isReverse={isReverse}>
              <h3>{project.project_name}</h3>
              <p>Prazo: {formatDate(project.end_date)}</p>
            </ProjectItemInfo>
          </>
        ) : (
          <>
            <ProjectItemInfo isReverse={isReverse}>
              <h3>{project.project_name}</h3>
              <p>Prazo: {formatDate(project.end_date)}</p>
            </ProjectItemInfo>
            <img src={project.images[0]} alt={project.project_name} />
          </>
        )}
      </ContentWrapper>
    </ProjectItemContainer>
  );
};
export default ProjectItem;
