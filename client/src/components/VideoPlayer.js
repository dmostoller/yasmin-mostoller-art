import React, {useEffect, useRef} from "react";
import cloudinary from 'cloudinary-video-player';
import "cloudinary-video-player/cld-video-player.min.css";

function VideoPlayer ({videoUrl}) {
  
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
      if (cloudinaryRef.current) return;
      cloudinaryRef.current = window.cloudinary;
      cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloudName: 'ddp2xfpyb'
      })
    }, []);

    return ( 
      <>
          <video
            ref={videoRef}
            data-cld-public-id={videoUrl}
            width='460'
            className="cld-video-player cld-fluid"
            controls
          />

        </>
    );
}

export default VideoPlayer