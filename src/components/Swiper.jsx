import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../stylePages/swiper/App.css'


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper

        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
       
        <SwiperSlide>

            <Link to="/#event-for-swipe">
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" loading='lazy'/>
          <h4>App development</h4>
          </Link>
         
        </SwiperSlide>
        <SwiperSlide>
            <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" loading="lazy"/>
          <h4>Soccer match</h4>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" loading="lazy"/>
          <h4>DJ</h4>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" loading="lazy"/>
          <h4>Local Sevens</h4>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" loading="lazy"/>
          <h4> Oodo road show</h4>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" loading="lazy"/>
          <h4></h4>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" loading="lazy"/>
          <h4></h4>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" loading="lazy"/>
          <h4></h4>
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}