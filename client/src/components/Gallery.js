import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


export default function Gallery() {
    const [paintings, setPaintings] = useState([])
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        fetch(`/painting`)
        .then((res) => res.json())
        .then((paintings) => {setPaintings(paintings)})
      }, []);

      const gallery = paintings.map((painting) => {
        return (
            <SwiperSlide>
                <img className='ui huge image' src={painting.image}></img>
                <div className="ui left aligned very basic padded segment">
                <h1 style={{marginBottom: "0px"}}> {painting.title} </h1>
                <h4 style={{marginBottom: "0px", marginTop: "5px"}}>{painting.materials}</h4>
                <h4 style={{marginBottom: "0px",marginTop: "5px"}}>{painting.width}" x {painting.height}"</h4>
                <h4 style={{marginTop: "5px"}}>{painting.sold ? "SOLD" : <Link to="/contact">${painting.sale_price}</Link>}</h4>
                </div>
            </SwiperSlide>
        )
    })
    const thumbGallery = paintings.map((painting) => {
        return (
            <SwiperSlide>
                <img className='ui huge image' src={painting.image}></img>
            </SwiperSlide>
        )
    })

    return (
        <>
        <Swiper
        //   style={{
        //     '--swiper-navigation-color': '#fff',
        //     '--swiper-pagination-color': '#fff',
        //   }}
          loop={true}
          autoHeight={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {gallery}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
            {thumbGallery}
        </Swiper>
      </>
    )
}