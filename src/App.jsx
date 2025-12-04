import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Navbar from './components/Layout/Navbar';
import ThemeBackground from './components/Theme/ThemeBackground';
import Player from './components/Player/Player';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import PlaylistsPage from './pages/PlaylistsPage';
import AchievementsPage from './pages/AchievementsPage';
import ThemesPage from './pages/ThemesPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <div className="min-h-screen bg-fazwave-dark text-white relative overflow-hidden">
      <ThemeBackground />
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="pt-20 pb-32 px-4 max-w-screen-xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/themes" element={<ThemesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        
        <Player />
      </div>
    </div>
  );
}
