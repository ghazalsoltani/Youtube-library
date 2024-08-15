import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get the username from the URL
import Library from './Library';

interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
    };
}

export default function Search() {
    const { username } = useParams<{ username: string }>(); // Capture the username from the URL
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [maxResults, setMaxResults] = useState<number>(5); // Default number of results
    const [results, setResults] = useState<Video[]>([]);
    const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTriggerSearch(true);
    };

    useEffect(() => {
        if (triggerSearch) {
            axios.get('http://localhost:3001/search', {
                params: {
                    query: searchTerm,
                    maxResults: maxResults
                }
            })
                .then((response) => {
                    setResults(response.data);
                    setTriggerSearch(false);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                    setTriggerSearch(false);
                });
        }
    }, [triggerSearch, searchTerm, maxResults]);

    const handleAddVideo = (video: { id: string; title: string }) => {
        axios.post(`http://localhost:3001/users/${username}/videos`, { video }) // Use the dynamic username here
            .then((response) => {
                console.log('Video added to library:', response.data);
                // Optionally refresh the user's library after adding
            })
            .catch((error) => {
                console.error('Error adding video to library:', error);
            });
    };

    return (
        <>
            <section id="library">
                <Library />
            </section>
            <section id="search">
                <h2>Search</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search YouTube"
                    />
                    <input
                        type="number"
                        value={maxResults}
                        onChange={(e) => setMaxResults(Number(e.target.value))}
                        min="1"
                        max="10"
                        placeholder="Max results"
                    />
                    <button type="submit">Search</button>
                </form>

                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {results.map((video) => (
                            <li key={video.id.videoId}>
                                <p>{video.snippet.title}</p>
                                <button onClick={() => handleAddVideo({
                                    id: video.id.videoId,
                                    title: video.snippet.title
                                })}>
                                    Add to Library
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

