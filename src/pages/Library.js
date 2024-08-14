import axios from 'axios';
import Video from '../components/Video';
import { useState, useEffect } from 'react';

export default function Library () {
    // Get username from param in url
    // const params = useParams();
    // const username = params.username;
    // console.log(username);
    

    // Get john videos from server Magic
    const [data, setRecords] = useState([]);
    // Get value when click is trigerred on one list item and send to Video component
    const [video, setValue] = useState({});

    // Fetch with useEffect
    useEffect(() => {
        axios
            .get("http://localhost:3001/users/john/videos")
            .then((response) => {
                // Save videos from file in data
                setRecords(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Callback pour supprimer un video
    // Penser à récupérer le user avant pour le transmettre au serveur

    const VideoBlock = () => {
        return (
            <>
                <section>
                    <h2>Video</h2>
                    <h3>Title : {video.title !== '' ? video.title : ''}</h3>
                    {/* Display this main block on right */}
                    <Video id={video.id} />
                </section>
            </>
        )
    }
    
    return (
        <>
            {/* Display this block on left */}
            <h1>Library</h1>
            {/* Bouton Search */}
            <ul>
                {data.map((video) => (
                    <li onClick={() => setValue({...video, id:video.id, title: video.title})} key={video.id}>
                        <input type="button" name="del" value="Delete" /> {video.title}
                    </li>
                ))}
            </ul>

            {/* Display this block on right */}
            {video.id ? <VideoBlock /> : ''}
        </>
    )
}