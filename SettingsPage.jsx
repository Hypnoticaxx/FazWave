import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { usePlayerStore } from '../stores/playerStore';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { quality, setQuality } = usePlayerStore();
  const [privacySettings, setPrivacySettings] = useState({
    showListeningActivity: true,
    showPlaylists: true,
    showAchievements: true,
  });

  const handlePrivacyChange = (key) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!user) {
    return (
      <div className="text-center text-gray-400 py-12">
        Please sign in to access settings
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Playback</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Audio Quality
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-4 py-3 bg-fazwave-surface rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fazwave-accent"
            >
              <option value="low">Low (96 kbps)</option>
              <option value="medium">Medium (160 kbps)</option>
              <option value="high">High (320 kbps)</option>
              <option value="lossless">Lossless (FLAC)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Privacy</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Listening Activity</p>
              <p className="text-gray-400 text-sm">Let others see what you're listening to</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('showListeningActivity')}
              className={`w-12 h-6 rounded-full transition-colors ${
                privacySettings.showListeningActivity
                  ? 'bg-fazwave-accent'
                  : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  privacySettings.showListeningActivity
                    ? 'translate-x-6'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Playlists</p>
              <p className="text-gray-400 text-sm">Make your playlists visible to others</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('showPlaylists')}
              className={`w-12 h-6 rounded-full transition-colors ${
                privacySettings.showPlaylists
                  ? 'bg-fazwave-accent'
                  : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  privacySettings.showPlaylists
                    ? 'translate-x-6'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Show Achievements</p>
              <p className="text-gray-400 text-sm">Display your achievements on profile</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('showAchievements')}
              className={`w-12 h-6 rounded-full transition-colors ${
                privacySettings.showAchievements
                  ? 'bg-fazwave-accent'
                  : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  privacySettings.showAchievements
                    ? 'translate-x-6'
                    : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">About</h2>
        <div className="space-y-2 text-gray-400">
          <p>FazWave v1.0.0</p>
          <p>Made with love for music fans</p>
        </div>
      </section>
    </div>
  );
}
