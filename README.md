# # YouTube Library Project
### Feature
![Feature Demo](screenshot/Youtube_library.gif)

## Tech Stack
- Node.js
- TypeScript
- YouTube API

## API Endpoints

- `GET /search` - Search for YouTube videos
- `POST /users/:username/videos` - Add a video to library
- `GET /users/:username/videos` - Get user's video library
- `DELETE /users/:username/videos/:videoId` - Remove video from library

## Setup

1. Clone the repository
2. Install dependencies:
   ```npm install```
3. Copy `.env.example` to `.env`:
   ```cp .env.example .env```
4. Add your YouTube API key to the `.env` file
5. Start the server:
   ```npm start```


### Install dependencies for Node Server
- express
- cors
- axios
- fs
- path

### Start Server
```bash
node ./index.js
```

### Install dependencies for React
- axios
- react-router-dom

### Start React App
```bash
npm start
```
