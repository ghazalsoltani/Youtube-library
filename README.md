# YouTube Library 🎬🎬🎬

A full-stack web application that allows users to create and manage personalized video libraries using the YouTube API. Built with React, TypeScript, and Node.js.

![YouTube Library Demo](./client/screenshot/Youtube_library.gif)

## 🌟 Features

- **Search YouTube Videos**: Search for videos using YouTube Data API v3
- **Personal Library Management**: Save and organize your favorite videos
- **User-Specific Libraries**: Each user has their own personalized library
- **Video Details**: View comprehensive video information including title, thumbnail, and description
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for library management
- **Responsive Design**: Clean and intuitive user interface that works on all devices
- **Real-time Video Playback**: Embedded YouTube player for seamless viewing experience

## 🏗️ Architecture

This project follows a clean monorepo architecture with clear separation of concerns:

```
youtube-library/
├── client/                 # React + TypeScript frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Router.tsx # Application routing
│   │   │   └── Video.tsx  # Video player component
│   │   ├── pages/         # Page components
│   │   │   ├── Library.tsx # User library page
│   │   │   └── Search.tsx  # Video search page
│   │   └── App.tsx        # Main application component
│   └── package.json
│
├── server/                # Node.js + Express backend
│   ├── data/             # JSON-based data storage
│   │   ├── john.json     # User libraries
│   │   └── mark.json
│   ├── index.js          # Express server configuration
│   └── package.json
│
├── .gitignore
├── package.json          # Root package.json for monorepo scripts
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 4.9.5** - Type safety and enhanced developer experience
- **React Router DOM 6.26.1** - Client-side routing
- **Axios 1.7.4** - HTTP client for API requests
- **React Scripts 5.0.1** - Build tooling and configuration

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web application framework
- **Axios 1.7.4** - HTTP client for YouTube API integration
- **CORS 2.8.5** - Cross-origin resource sharing

### External APIs
- **YouTube Data API v3** - Video search and metadata retrieval

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- YouTube API Key ([Get one here](https://developers.google.com/youtube/v3/getting-started))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ghazalsoltani/Youtube-library.git
cd Youtube-library
```

### 2. Install dependencies

```bash
# Install all dependencies (client + server)
npm run install:all
```

### 3. Set up environment variables

Create a `.env` file in the `server` directory:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
PORT=5000
```

**How to get a YouTube API Key:**
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the key to your `.env` file

### 4. Run the application

```bash
# Start both client and server
npm start
```

The application will be available at:
- **Client**: http://localhost:3000 (redirects to http://localhost:3000/home)
- **Server**: http://localhost:5000

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run both client and server concurrently |
| `npm run install:all` | Install dependencies for both client and server |
| `npm run client` | Run the React development server only |
| `npm run server` | Run the Express backend server only |
| `npm run dev` | Run both client and server (alternative to start) |
| `npm run build` | Create production build of the client |

## 🔌 API Endpoints

### YouTube Search
- **GET** `/search?query={query}&maxResults={number}` - Search YouTube videos

### User Library Management
- **GET** `/users/:username/videos` - Get user's library
- **POST** `/users/:username/videos` - Add video to library
- **DELETE** `/users/:username/videos/:videoId` - Remove video from library

## 💡 Key Implementation Details

### Type Safety
The project leverages TypeScript throughout the frontend for enhanced type safety and better developer experience:

```typescript
interface VideoType {
  id: string;
  title: string;
  isEditing?: boolean;
}
```

### Routing Structure
Clean URL structure with automatic redirects:
- `/` → redirects to `/home`
- `/home` → User's library page (username: "home")
- `/:username` → Specific user's library page

### Data Persistence
The server uses a JSON file-based storage system for simplicity and easy deployment. User libraries are stored in `server/data/` directory. This can be easily upgraded to a database (MongoDB, PostgreSQL, etc.) in the future.

### Component Architecture
- **Separation of Concerns**: Router, Video player, and page components are separated
- **Reusable Components**: Video component can be used throughout the application
- **State Management**: React hooks for local state management

## 🔒 Security Considerations

- API keys are stored in environment variables (not committed to repository)
- CORS is properly configured for cross-origin requests
- Input validation on both client and server
- `.env.example` provided for easy setup without exposing secrets

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Video categories and tags
- [ ] Playlist creation and management
- [ ] Social features (sharing libraries)
- [ ] Advanced search filters (date, duration, channel)
- [ ] Video statistics and analytics
- [ ] Export library functionality
- [ ] Dark mode support
- [ ] Favorites and watch later features

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1920px+)
- Laptops (1366px+)
- Tablets (768px+)
- Mobile devices (320px+)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🏗️ Building for Production

```bash
# Build the client
npm run build

# The optimized files will be in client/build/
```

## 👤 Author

### **Ghazal Soltani**

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-ghazalsoltani-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ghazalsoltani)


[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ghazal_Soltani-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ghazal-soltani/)
