'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core swiper styles
import 'swiper/css/pagination'; // Pagination module styles
import { Pagination } from 'swiper/modules'; // Use pagination from Swiper modules
import Image from 'next/image';
import { useState } from 'react';
import Indicator from './Indicator'; // Your custom Indicator component

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    'https://blog.ja.playstation.com/tachyon/sites/7/2021/07/a3d299e7a2841e06dcb6771ade6f25a3b4973985.jpg?fit=1024%2C675',
    'https://www.gamespark.jp/imgs/p/vfrvPUfFBDEEkDjVvIkR5MMLlgcGBQQDAgEA/881764.jpg',
    'https://i.ytimg.com/vi/bVCrY9Xg0Tg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAgtrt6iWHd78U0DX1G8h8Bit8NpA',
    'https://prcdn.freetls.fastly.net/release_image/96124/240/96124-240-cd3a75dae4768c52c9e7899be7f1ce79-1536x864.jpg?format=jpeg&auto=webp&fit=bounds&width=2400&height=1260',
  ];

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
        onSlideChangeTransitionEnd={(swiper) =>
          setActiveIndex(swiper.realIndex)
        } // Updated to use `realIndex`
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-48">
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Indicator activeIndex={activeIndex} totalSlides={images.length} />
    </div>
  );
};

export default Carousel;
