'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core swiper styles
import 'swiper/css/pagination'; // Pagination module styles
import Image from 'next/image';
import { useState } from 'react';
import Indicator from './Indicator'; // Your custom Indicator component
import { backgroundTypes } from '@/options/template';

interface CarouselProps {
  background: backgroundTypes[];
  onSetPrompt: (prompt: string) => void;
}
const Carousel = (props: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mx-auto max-w-screen-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          setActiveIndex(swiper.realIndex);
          props.onSetPrompt(props.background[swiper.realIndex].prompt);
        }} // Updated to use `realIndex`
      >
        {props.background.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-48">
              <Image
                src={image.image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
        <Indicator
          activeIndex={activeIndex}
          totalSlides={props.background.length}
        />
      </Swiper>
    </div>
  );
};

export default Carousel;
