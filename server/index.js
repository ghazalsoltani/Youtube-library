const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


const API_KEY = 'AIzaSyBNnouTt_jnnCjYcLCtT2etBU6Kss-PnwM'; 
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

app.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
            params: {
                q: query,
                part: 'snippet',
                type: 'video',
                maxResults: 5,
                key: API_KEY
            }
        });
        res.json(response.data.items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching for videos');
    }
});

app.post('/users/:username/videos', (req, res) => {
    const { username } = req.params;
    const { video } = req.body;

    if (!video || !video.id || !video.title) {
        console.error('Invalid video data:', req.body);
        return res.status(400).send('Video data is required');
    }

    const filePath = path.join(__dirname, `${username}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('User not found');
    }

    try {
        const userData = JSON.parse(fs.readFileSync(filePath));
        if (!userData.videos) {
            userData.videos = []; // Initialize the videos array if not present
        }
        userData.videos.push(video);
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
        res.send(`Video with ID "${video.id}" added to user "${username}"`);
    } catch (error) {
        console.error('Error adding video to library:', error);
        res.status(500).send('Error adding video to library');
    }
});

// Get the user's library
app.get('/users/:username/videos', (req, res) => {
    const { username } = req.params;

    const filePath = path.join(__dirname, `${username}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('User not found');
    }

    try {
        const userData = JSON.parse(fs.readFileSync(filePath));
        if (userData.videos) {
            res.send(userData.videos);  // Initialize the videos array if not present
        }
    } catch (error) {
        console.error('Error getting user video to json file:', error);
        res.status(500).send('Error getting user video to json file');
    }
});

// Remove a video from the user's library
app.delete('/users/:username/videos/:videoId', (req, res) => {
    const { username, videoId } = req.params;
    const filePath = path.join(__dirname, `${username}.json`);

    try {
        const userData = JSON.parse(fs.readFileSync(filePath));
        const videoIndex = userData.videos.findIndex(v => v.id === videoId);

        if (videoIndex === -1) {
            return res.status(404).send(`Video with ID "${videoId}" not found`);
        }

        userData.videos.splice(videoIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
        res.send(`Video with ID "${videoId}" removed from user "${username}"`);
    } catch (error) {
        console.error('Error removing video from library:', error);
        res.status(500).send('Error removing video from library');
    }
}); 

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});