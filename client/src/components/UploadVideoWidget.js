import React, { useEffect, useRef } from "react";


function UploadVideoWidget({onSetVideoUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'yasmin_video',
            multiple: false,  //restrict upload to a single file
        }, function(error, result) { 
            if (!error && result && result.event === "success") {
                // console.log(result.info);
                onSetVideoUrl(result.info.public_id);
    }});
    }, [onSetVideoUrl])

return (
    <>
    <button style={{marginTop: "3px"}} type="button" className="ui circular button fluid purple small" onClick={() => widgetRef.current.open()}>
        Upload Video
    </button>
    </>
)

}
export default UploadVideoWidget;