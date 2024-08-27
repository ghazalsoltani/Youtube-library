import React from 'react';
//The VideoProps interface is used to specify that any object passed to the Video component as props must have an id property of type string.
interface VideoProps {
    id: string;
}

const Video: React.FC<VideoProps> = ({ id }) => {
    const videoUrl = `https://www.youtube.com/embed/${id}`;

    return (
        <iframe
            width="100%"
            height="500px"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}

export default Video;