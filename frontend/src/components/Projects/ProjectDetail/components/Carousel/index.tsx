import React from 'react';
import { Carousel } from 'primereact/carousel';
import { CarouselWrapper, ContentWrapper } from './styles';
import { IProjectModel } from '../../../../../models/project/ProjectModel';

const ItemTemplate: React.FC<any> = (props) => {
  return (
    <ContentWrapper>
      <img src={props.image} alt={props.title} />
    </ContentWrapper>
  );
};

interface ICarouselComponent {
  projects: IProjectModel[];
}

export default function CarouselComponent({
  projects,
}: ICarouselComponent): JSX.Element {
  return (
    <CarouselWrapper>
      <Carousel
        value={projects}
        itemTemplate={ItemTemplate}
        numVisible={3}
        numScroll={1}
        orientation='horizontal'
        indicatorsContentClassName='indicators'
        containerClassName='carousel-container'
      />
    </CarouselWrapper>
  );
}
