import React from "react";

function VideoPlayer ({videoUrl}) {
    // const videoUrl = 'IMG_0_ovyfcf'
    const cloudName = 'ddp2xfpyb'
    const url = `https://player.cloudinary.com/embed/?public_id=${videoUrl}&cloud_name=${cloudName}&player%5Bfluid%5D=true&player%5Bcontrols%5D=true&source%5Bsource_types%5D%5B0%5D=mp4`;

    return ( 

        <div 
        className="iframe-container"
        >
        <iframe 
        className="responsive-iframe"
          title="Cloudinary Player"
          src={url}
          width="640"   
          height="480"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
        </div>

    );
}

export default VideoPlayer