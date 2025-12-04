# FazWave - Music Streaming Platform

## Overview
FazWave is a feature-rich music streaming platform built with React, featuring 18 animated themes, Tidal-style player with scrolling lyrics, and full Xano backend integration.

## Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand with persistence
- **API**: Axios connecting to Xano backend
- **PWA**: Vite PWA plugin for offline support
- **Romanization**: wanakana for Japanese/Korean lyric romanization

## Project Structure
```
src/
├── api/
│   └── xano.js          # Xano API service layer
├── components/
│   ├── Auth/            # Login/Signup forms
│   ├── Achievements/    # Achievement badges & confetti
│   ├── Layout/          # Navbar
│   ├── Player/          # Tidal-style player with lyrics
│   ├── Theme/           # Theme background & selector
│   └── Tracks/          # Track list with search
├── pages/               # Route pages
├── stores/
│   ├── authStore.js     # Authentication state
│   ├── playerStore.js   # Player state & controls
│   └── themeStore.js    # Theme state with 18 themes
├── styles/
│   └── index.css        # Global styles & animations
└── utils/
    ├── formatTime.js    # Time formatting
    └── romanize.js      # JP/KR romanization
```

## Features

### Themes (18 Total)
- **Pastel Rainbow** (Default): Stars & confetti animations
- **Blue Valentine** (Secret - code: "afton"): Petals, neon waves, bloom effects
- **Lucifer**: Floating apples, mist, dark-red-gold glow
- **Vox**: Hypnotic swirl, ripple, neon glow
- **FNaF**: Glitch, static, scanlines, flickering lights, eye glow
- **Alastor**: Radio sigils, static
- **Charlie**: Warm colors, sparkles
- **Angel Dust**: Glamorous sparkles, feathers
- **Vaggie**: Particle effects
- **Husk**: Falling cards, casino motifs
- **Sonic Blue**: Speed trails, electric glow
- **Tails Yellow**: Golden streaks
- **Knuckles Red**: Crimson streaks
- **Shadow Black**: Crimson pulses, chaos control
- **Ichigo**: Energy particles
- **Rukia**: Ice particles, snowflakes
- **Hollow**: Mask overlay
- **Espada**: Energy particles

### Player Features
- Expandable fullscreen mode
- Left-side scrolling lyrics
- Auto-romanization for Japanese/Korean lyrics
- Volume control with mute
- Shuffle & repeat modes
- Quality selection (96kbps - Lossless)
- Progress bar with seek

### Authentication
- Login/Signup with Xano backend
- Profile management
- Privacy settings

## Xano Backend Configuration

### Required CORS Setup
To enable API calls from your Replit app, configure CORS in your Xano API settings:

1. Go to your Xano workspace
2. Navigate to Settings > API Groups
3. Select your API group (api:LtSwFmWE)
4. Add allowed origins:
   - Your Replit URL (e.g., `https://your-repl.username.repl.co`)
   - `http://localhost:5000` (for local development)

### API Endpoints Used
- `/auth/login` - User login
- `/auth/signup` - User registration
- `/auth/me` - Get current user
- `/track` - Get all tracks
- `/lyric` - Get lyrics
- `/playlist` - Get playlists
- `/theme` - Get themes
- `/achievement` - Get achievements
- `/user_achievement` - Get user achievements
- `/user_favorite_track` - User favorites
- `/user_listen_history` - Listen history

## Development

### Run Development Server
```bash
npm run dev
```
Server runs on port 5000.

### Build for Production
```bash
npm run build
```

## Recent Changes
- Initial FazWave platform setup
- 18 animated themes implemented
- Tidal-style player with lyrics
- Japanese/Korean romanization support
- PWA configuration
- Xano API integration

## User Preferences
- Dark theme by default
- Pastel Rainbow as default theme
- Secret theme "Blue Valentine" unlocked with code "afton"
