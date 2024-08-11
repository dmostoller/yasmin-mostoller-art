import React from "react";
import Slider from './Slider.js';
import PostsList from "./PostsList.js";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin.js"
import { useDevice } from "../context/device";
import SwiperHeader from "./Swiper.js";


export default function HomePage () {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const {deviceSize} = useDevice()

return (
    <div className="ui container fluid">
        {/* {(deviceSize > 768) && */}
        <>
            <div className="ui container fluid" style={{textAlign: "center"}}>

                {/* <Slider /> */}

                    {/* <div className="ui left aligned text basic container segment">
                        <p>My name is Yasmin Mostoller, and I’m eager to share my art with the world, offering a unique vision of the galaxy's beauty through abstract expression. As a painter, I draw inspiration from the natural world's profound beauty and the mysteries it holds.</p>
                        <p>My work explores the intricate relationship between light, shadow, and atmosphere, using vibrant color, form, and texture to create immersive, multi-dimensional experiences. Whether timeless and elegant or modern and chaotic, the galaxy demands to be explored in all its facets.</p>
                        <p>I layer paint meticulously to produce highly textured, three-dimensional pieces on canvas and paper. The colors, textures, and enigmatic qualities of the galaxy, its stars, planets, and celestial bodies serve as my primary inspiration.</p>
                        <p>I believe in the power of creativity, imagination, and self-expression. Art, to me, has the potential to convey profound truths about our universe and humanity. It can evoke memories, transport us to new realms of thought and feeling, and offer fresh perspectives.</p>
                        <p>Through my paintings, I seek to capture the moments that resonate with me, allowing imagination and emotion to shape my vibrant abstract creations.</p>
                    </div> */}

                    <SwiperHeader />
            </div>
            <p style={{textAlign: "center", marginTop:"15px", marginBottom: "0px"}}>"To draw, you must close your eyes and sing." <i> -Pablo Picasso</i></p>
        </>
        {/* } */}
        <div className="ui container fluid"><PostsList user={user} isAdmin={isAdmin}/></div>
    </div>
)
}