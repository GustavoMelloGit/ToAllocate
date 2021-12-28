import React from 'react';
import { useParams } from 'react-router-dom';
import { AppLayoutComponent } from '../../../components';

const EditProject: React.FC = () => {
  const { uuid } = useParams();

  return (
    <AppLayoutComponent>
      <p>Hello World</p>
    </AppLayoutComponent>
  );
};
export default EditProject;
