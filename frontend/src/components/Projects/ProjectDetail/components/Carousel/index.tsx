import React from 'react';
import { Carousel, CarouselResponsiveOptions } from 'primereact/carousel';
import { CarouselWrapper, ContentWrapper } from './styles';
import Breakpoints from '../../../../../shared/constants/Breakpoints';

const ItemTemplate: React.FC<any> = (props) => {
  return (
    <ContentWrapper>
      <img src={props} alt={props} />
    </ContentWrapper>
  );
};

interface ICarouselComponent {
  images: (string | undefined)[];
  style?: object;
}

const CarouselComponent: React.FC<ICarouselComponent> = (
  props
): JSX.Element => {
  const { images, style } = props;
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
        value={images}
        itemTemplate={ItemTemplate}
        numVisible={2}
        numScroll={1}
        orientation='horizontal'
        indicatorsContentClassName='indicators'
        containerClassName='carousel-container'
        responsiveOptions={responsiveOptions}
        style={{ ...style }}
      />
    </CarouselWrapper>
  );
};

export default CarouselComponent;
