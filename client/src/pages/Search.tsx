import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import YouTubeLogo from '../assets/youtube_logo.png'

interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
    };
}

interface SearchProps {
    onAddVideo: (video: { id: string; title: string }) => void;
}

export default function Search({ onAddVideo }: SearchProps) {
    const { username } = useParams<{ username: string }>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [maxResults, setMaxResults] = useState<number>(5);
    const [results, setResults] = useState<Video[]>([]);
    const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTriggerSearch(true);
    };

    useEffect(() => {
        if (triggerSearch && searchTerm) {
            axios.get('http://localhost:3001/search', {
                params: {
                    query: searchTerm,
                    maxResults: maxResults
                }
            })
                .then(response => {
                    setResults(response.data);
                    setTriggerSearch(false);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setTriggerSearch(false);
                });
        }
    }, [triggerSearch, searchTerm, maxResults]);

    const handleAddVideo = (video: Video) => {
        const newVideo = { id: video.id.videoId, title: video.snippet.title };
        axios.post(`http://localhost:3001/users/${username}/videos`, { video: newVideo })
            .then(response => {
                onAddVideo(newVideo);
                console.log('Video added to library:', response.data);
            })
            .catch(error => console.error('Error adding video to library:', error));
    };

    return (
        <>
            <h2>Search in <img src={YouTubeLogo} alt="YouTube" style={{ height: '38px', verticalAlign: 'middle' }} /></h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search YouTube"
                    required
                />
                <input
                    type="number"
                    value={maxResults}
                    onChange={(e) => setMaxResults(Number(e.target.value))}
                    min="1"
                    max="5"
                    placeholder="Max results"
                    required
                />
                <button type="submit">Search</button>
            </form>

            <div>
                <h3>Search results : </h3>
                <ul>
                    {results.slice(0, maxResults).map(video => (
                        <li key={video.id.videoId}>
                            <p>{video.snippet.title}</p>
                            <button onClick={() => handleAddVideo(video)}>
                                Add to Library
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}