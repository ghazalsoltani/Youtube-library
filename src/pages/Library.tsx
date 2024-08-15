import axios from 'axios';
import Video from '../components/Video';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface VideoType {
    id: string;
    title: string;
}

export default function Library() {
    // Get username from param in URL
    const { username } = useParams<{ username: string }>();

    // State to hold videos data
    const [data, setRecords] = useState<VideoType[]>([]);
    // State to hold the selected video
    const [video, setValue] = useState<VideoType | null>(null);

    // Fetch user's videos using useEffect
    useEffect(() => {
        axios
            .get<VideoType[]>(`http://localhost:3001/users/${username}/videos`)  // Use the dynamic username here
            .then((response: any) => {
                // Save videos from file in data
                setRecords(response.data);
            })
            .catch((error: any) => {
                console.error('Error fetching videos:', error);
            });
    }, [username]);  // Adding username to the dependency array to refetch when username changes

    // Function to handle video deletion
    const handleDelete = (videoId: string) => {
        axios
            .delete(`http://localhost:3001/users/${username}/videos/${videoId}`)  // Delete request to the backend
            .then(() => {
                // Remove the deleted video from the state
                setRecords(data.filter(video => video.id !== videoId));
                if (video?.id === videoId) {
                    setValue(null); // Deselect video if it was deleted
                }
            })
            .catch((error: any) => {
                console.error('Error deleting video:', error);
            });
    };

    // Component to display selected video details
    const VideoBlock = () => {
        if (!video) {
            return <p>Select a video to view it here</p>; // Prompt when no video is selected
        }

        return (
            <section>
                <h2>{video.title}</h2>
                <Video id={video.id} />
            </section>
        );
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Display the user's library on the left */}
            <div style={{ width: '30%', paddingRight: '10px' }}>
                <h1>{username}'s Library</h1>
                <ul>
                    {data.map((video) => (
                        <li key={video.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span onClick={() => setValue(video)} style={{ cursor: 'pointer', flex: 1 }}>
                                {video.title}
                            </span>
                            <button onClick={() => handleDelete(video.id)} style={{ marginLeft: '10px' }}>
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Display the selected video on the right */}
            <div style={{ width: '70%' }}>
                {video ? <VideoBlock /> : <p>No video selected.</p>}
            </div>
        </div>
    );
}

