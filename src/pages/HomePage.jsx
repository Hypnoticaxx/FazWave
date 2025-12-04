import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTracks, getPlaylists } from '../api/xano';
import { usePlayerStore } from '../stores/playerStore';
import { useAuthStore } from '../stores/authStore';

export default function HomePage() {
  const [recentTracks, setRecentTracks] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setQueue, currentTrack, isPlaying, togglePlay } = usePlayerStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksRes, playlistsRes] = await Promise.all([
          getTracks(),
          getPlaylists(),
        ]);
        setRecentTracks((tracksRes.data || []).slice(0, 6));
        setFeaturedPlaylists((playlistsRes.data || []).slice(0, 4));
      } catch (e) {
        console.error('Failed to fetch data:', e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleTrackClick = (track, index) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setQueue(recentTracks, index);
    }
  };

  return (
    <div className="space-y-10">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
          Welcome to FazWave
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {isAuthenticated
            ? `Good to see you, ${user?.display_name || 'friend'}! Ready to vibe?`
            : 'Your ultimate music streaming experience with amazing themes and vibes.'}
        </p>
        {!isAuthenticated && (
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-fazwave-accent to-fazwave-secondary rounded-full text-white font-semibold hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/browse"
              className="px-8 py-3 bg-fazwave-surface rounded-full text-white font-semibold hover:bg-fazwave-surface-light transition-all"
            >
              Browse Music
            </Link>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recently Added</h2>
          <Link
            to="/browse"
            className="text-fazwave-accent hover:underline text-sm"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fazwave-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentTracks.map((track, index) => {
              const isActive = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(track, index)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-fazwave-surface">
                    {track.cover_url ? (
                      <img
                        src={track.cover_url}
                        alt={track.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-fazwave-accent to-fazwave-secondary flex items-center justify-center">
                        <span className="text-4xl">🎵</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-fazwave-accent rounded-full flex items-center justify-center">
                        {isActive && isPlaying ? (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <h4 className={`font-medium truncate ${isActive ? 'text-fazwave-accent' : 'text-white'}`}>
                    {track.title}
                  </h4>
                  <p className="text-gray-400 text-sm truncate">
                    {track.artist_name || 'Unknown Artist'}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
          <Link
            to="/playlists"
            className="text-fazwave-accent hover:underline text-sm"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fazwave-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-fazwave-surface rounded-xl p-4 hover:bg-fazwave-surface-light transition-colors cursor-pointer group"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-fazwave-accent to-fazwave-secondary">
                  {playlist.cover_url ? (
                    <img
                      src={playlist.cover_url}
                      alt={playlist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">📀</span>
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-white truncate">{playlist.name}</h4>
                <p className="text-gray-400 text-sm">
                  {playlist.track_count || 0} tracks
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Unlock Secret Themes</h2>
        <p className="text-gray-400 mb-6">
          FazWave has hidden themes waiting to be discovered. Can you find the secret code?
        </p>
        <Link
          to="/themes"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition-all"
        >
          Explore Themes
        </Link>
      </section>
    </div>
  );
}
