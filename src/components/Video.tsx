import React from 'react';

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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}

export default Video;