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
import SEO from './SEO.js';


import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


export default function Gallery() {
    const [paintings, setPaintings] = useState([])
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetch(`/painting`)
        .then((res) => res.json())
        .then((paintings) => {
            setPaintings(paintings)
            setLoading(false)
        })
      }, []);

      const gallery = paintings.map((painting) => {
        return (
            <SwiperSlide>
                <div className='ui huge image'>
                    <img className='image' src={painting.image}></img>
                </div>
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
                <img className='ui medium image' src={painting.image}></img>
            </SwiperSlide>
        )
    })

    return (
        <div className='ui container' style={{marginTop: "100px", minHeight: "200vh"}}>
            <SEO
            title="Yasmin Mostoller | Gallery"
            description="Imagination and Emotion"
            name="Yasmin Mostoller"
            type="website"
            image="https://yasminmostoller.com/images/slider2.jpg"
            url="https://yasminmostoller.com/gallery"
            />
        <div className='ui container' style={{height: "900px", width: "1200px"}}>
        <div className='ui container'>
        { loading ?
        <div class="ui center aligned segment" style={{minHeight: "90vh"}}>
            <div class="ui active inverted dimmer">
                <div class="ui massive active slow blue double text loader">
                    Loading
                </div>
            </div>
            <p></p>
            <p></p>
            <p></p>
        </div>
        :
        <>
        <Swiper
          loop={true}
          autoHeight={true}
          spaceBetween={100}
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
    }
      </div>
      </div>
      </div>
    
    )
}