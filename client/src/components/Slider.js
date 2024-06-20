import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import slider1 from "../assets/slider/slider-1.jpg"
import slider2 from "../assets/slider/slider-2.jpg"
import slider3 from "../assets/slider/slider-3.jpg"
import slider4 from "../assets/slider/slider-4.jpg"
import React, {useState, useEffect} from "react";


export default function Slider () {
    const [deviceSize, setDeviceSize] = useState(window.innerWidth);

    useEffect(() => {
      const resizeW = () => setDeviceSize(window.innerWidth);
      window.addEventListener("resize", resizeW); // Update the width on resize
      return () => window.removeEventListener("resize", resizeW);
    });

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      return (
        
        <div className="ui container">
        {(deviceSize > 768) &&
        <Carousel
            centerMode={false}
            swipeable={true}
            draggable={true}
            showDots={false}
            renderDotsOutside={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={3000}
            autoPlay={true}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <div>
                <img style={{height: "600px"}} src={slider1} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "600px"}} src={slider2} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "600px"}} src={slider3} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "600px"}} src={slider4} alt="Yasmin Mostoller"></img>
            </div>      
        </Carousel>
}
 {       (deviceSize <= 768 ) &&
                <Carousel
            centerMode={false}
            swipeable={true}
            draggable={true}
            showDots={false}
            renderDotsOutside={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={3000}
            autoPlay={true}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <div>
                <img style={{height: "250px"}} src={slider1} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "250px"}} src={slider2} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "250px"}} src={slider3} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "250px"}} src={slider4} alt="Yasmin Mostoller"></img>
            </div>      
        </Carousel>
        }
        {/* {(deviceSize < 360) &&
        <Carousel
            centerMode={false}
            swipeable={true}
            draggable={true}
            showDots={false}
            renderDotsOutside={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={3000}
            autoPlay={true}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={300}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <div>
                <img style={{height: "200px"}} src={slider1} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "200px"}} src={slider2} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "200px"}} src={slider3} alt="Yasmin Mostoller"></img>
            </div>
            <div>
                <img style={{height: "200px"}} src={slider4} alt="Yasmin Mostoller"></img>
            </div>      
        </Carousel>
} */}
      </div>
      );

}
