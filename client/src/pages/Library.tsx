import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Video from '../components/Video';
import Search from './Search'; 

interface VideoType {
    id: string;
    title: string;
    isEditing?: boolean;
}

export default function Library() {
    const { username } = useParams<{ username: string }>();
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Fetch user's videos on component mount
    useEffect(() => {
        axios.get<VideoType[]>(`http://localhost:3001/users/${username}/videos`)
            .then(response => setVideos(response.data))
            .catch(error => console.error('Error fetching videos:', error));
    }, [username]);

    // Function to handle deleting a video
    const handleDelete = (videoId: string) => {
        axios.delete(`http://localhost:3001/users/${username}/videos/${videoId}`)
            .then(() => {
                setVideos(videos.filter(video => video.id !== videoId));
                if (selectedVideo?.id === videoId) {
                    setSelectedVideo(null);
                }
            })
            .catch(error => console.error('Error deleting video:', error));
    };

    // Function to handle adding a new video to the list
    const handleAddVideo = (video: VideoType) => {
        const videoExists = videos.some(v => v.id === video.id);

        if (videoExists) {
            alert('This video is already in the library.');
            return; // Exit the function if the video already exists
        }
        setVideos([...videos, video]); 
        setSelectedVideo(video);
        setIsSearchOpen(false);
    };

    // Function to handle changes in the video title
    const handleTitleChange = (videoId: string, newTitle: string) => {
        setVideos(videos.map(video =>
            video.id === videoId ? { ...video, title: newTitle } : video
        ));
    };

    // Function to toggle between editing and viewing the title, also handles saving
    const toggleEdit = (videoId: string) => {
        setVideos(videos.map(video =>
            video.id === videoId ? { ...video, isEditing: !video.isEditing } : video
        ));
    };

    // Function to handle the Enter key press event
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, videoId: string) => {
        if (event.key === 'Enter') {
            toggleEdit(videoId);
        }
    };

    return (
        <div className="container">
            {/* Left panel: Library and search button */}
            <div className="left-panel">
                <h1>{username}'s Library</h1>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>Search Videos</button>
                <ul>
                    {videos.map(video => (
                        <li key={video.id}>
                            {/* If isEditing is true, show an input field, else show the title */}
                            {video.isEditing ? (
                                <input
                                    type="text"
                                    value={video.title}
                                    onChange={(e) => handleTitleChange(video.id, e.target.value)}
                                    onBlur={() => toggleEdit(video.id)} 
                                    onKeyDown={(e) => handleKeyPress(e, video.id)} 
                                    autoFocus
                                />
                            ) : (
                                <span onClick={() => setSelectedVideo(video)} style={{ cursor: 'pointer' }}>
                                    {video.title}
                                </span>
                            )}
                            {/* Button to toggle between edit and save modes */}
                            <button onClick={() => toggleEdit(video.id)}>
                                {video.isEditing ? "Save" : "Edit"}
                            </button>
                            {/* Button to delete the video */}
                            <button onClick={() => handleDelete(video.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right panel: Search and Video Player */}
            <div className="right-panel">
                {isSearchOpen ? (
                    <Search onAddVideo={handleAddVideo} />
                ) : (
                    selectedVideo ? (
                        <div>
                            <h2>{selectedVideo.title}</h2>
                            <Video id={selectedVideo.id} />
                        </div>
                    ) : (
                        <p>No video selected.</p>
                    )
                )}
            </div>
        </div>
    );
}