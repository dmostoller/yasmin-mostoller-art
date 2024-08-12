// import Swiper core and required modules
import { Scrollbar, EffectFade, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

import slider1 from "../assets/slider/new-slider/slider-1.jpg"
import slider2 from "../assets/slider/new-slider/slider-2.jpg"
import slider3 from "../assets/slider/new-slider/slider-3.jpg"
import slider4 from "../assets/slider/new-slider/slider-4.jpg"
import slider5 from "../assets/slider/new-slider/slider-5.jpg"

export default function SwiperHeader() {

    return (
        <Swiper
          // install Swiper modules
          modules={[ Scrollbar, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          effect='fade'
          crossfade={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          className='mySwiper'
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide><img style={{height: "600px"}} src={slider1} alt="Yasmin Mostoller"></img></SwiperSlide>
          <SwiperSlide><img style={{height: "600px"}} src={slider2} alt="Yasmin Mostoller"></img></SwiperSlide>
          <SwiperSlide><img style={{height: "600px"}} src={slider3} alt="Yasmin Mostoller"></img></SwiperSlide>
          <SwiperSlide><img style={{height: "600px"}} src={slider4} alt="Yasmin Mostoller"></img></SwiperSlide>
          <SwiperSlide><img style={{height: "600px"}} src={slider5} alt="Yasmin Mostoller"></img></SwiperSlide>

          {/* <SwiperSlide>
            <p>
                My name is Yasmin Mostoller, and I’m eager to share my art with the world, offering a unique vision of the galaxy's beauty through abstract expression. As a painter, I draw inspiration from the natural world's profound beauty and the mysteries it holds.
            </p>          
          </SwiperSlide>
          <SwiperSlide>
            <p>
            My work explores the intricate relationship between light, shadow, and atmosphere, using vibrant color, form, and texture to create immersive, multi-dimensional experiences. Whether timeless and elegant or modern and chaotic, the galaxy demands to be explored in all its facets.
            </p>          
          </SwiperSlide>
          <SwiperSlide>
            <p>
            I layer paint meticulously to produce highly textured, three-dimensional pieces on canvas and paper. The colors, textures, and enigmatic qualities of the galaxy, its stars, planets, and celestial bodies serve as my primary inspiration.
            </p>          
          </SwiperSlide>
          <SwiperSlide>
            <p>
            I believe in the power of creativity, imagination, and self-expression. Art, to me, has the potential to convey profound truths about our universe and humanity. It can evoke memories, transport us to new realms of thought and feeling, and offer fresh perspectives.
            </p>          
          </SwiperSlide>
          <SwiperSlide>
            <p>
            Through my paintings, I seek to capture the moments that resonate with me, allowing imagination and emotion to shape my vibrant abstract creations.
            </p>          
          </SwiperSlide> */}

          
        </Swiper>
      );

}