import React from 'react';
import { Carousel, CarouselResponsiveOptions } from 'primereact/carousel';
import { CarouselWrapper, ContentWrapper } from './styles';
import { IProjectModel } from '../../../../../models/project/ProjectModel';
import Breakpoints from '../../../../../shared/constants/Breakpoints';

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
  const responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: `${Breakpoints.xl}px`,
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: `${Breakpoints.md}px`,
      numVisible: 1,
      numScroll: 1,
    },
  ];

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
        responsiveOptions={responsiveOptions}
      />
    </CarouselWrapper>
  );
}
