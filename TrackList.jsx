import React, { useEffect, useState } from 'react';
import { getTracks, getPlaylists } from '../../api/xano';
import { usePlayerStore } from '../../stores/playerStore';

export default function TrackList() {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const { setQueue, currentTrack, isPlaying, togglePlay } = usePlayerStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksRes, playlistsRes] = await Promise.all([
          getTracks(),
          getPlaylists(),
        ]);
        setTracks(tracksRes.data || []);
        setPlaylists(playlistsRes.data || []);
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
      setQueue(filteredTracks, index);
    }
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fazwave-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === 'tracks'
                ? 'bg-fazwave-accent text-white'
                : 'bg-fazwave-surface text-gray-400 hover:text-white'
            }`}
          >
            Tracks
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === 'playlists'
                ? 'bg-fazwave-accent text-white'
                : 'bg-fazwave-surface text-gray-400 hover:text-white'
            }`}
          >
            Playlists
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 bg-fazwave-surface rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fazwave-accent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {activeTab === 'tracks' && (
        <div className="grid gap-2">
          {filteredTracks.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              {searchQuery ? 'No tracks found' : 'No tracks available'}
            </div>
          ) : (
            filteredTracks.map((track, index) => {
              const isActive = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(track, index)}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? 'bg-fazwave-accent/20 border border-fazwave-accent/50'
                      : 'bg-fazwave-surface/50 hover:bg-fazwave-surface border border-transparent'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    {track.cover_url ? (
                      <img
                        src={track.cover_url}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-fazwave-accent to-fazwave-secondary flex items-center justify-center">
                        <span className="text-lg">🎵</span>
                      </div>
                    )}
                    {isActive && isPlaying && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="flex gap-0.5">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-white rounded-full animate-pulse"
                              style={{
                                height: `${8 + Math.random() * 8}px`,
                                animationDelay: `${i * 0.15}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium truncate ${isActive ? 'text-fazwave-accent' : 'text-white'}`}>
                      {track.title}
                    </h4>
                    <p className="text-gray-400 text-sm truncate">
                      {track.artist_name || 'Unknown Artist'}
                    </p>
                  </div>

                  <div className="text-gray-400 text-sm hidden sm:block">
                    {track.duration || '0:00'}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No playlists available
            </div>
          ) : (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-fazwave-surface rounded-xl p-4 hover:bg-fazwave-surface-light transition-colors cursor-pointer group"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-fazwave-accent to-fazwave-secondary flex items-center justify-center">
                  {playlist.cover_url ? (
                    <img
                      src={playlist.cover_url}
                      alt={playlist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span className="text-4xl">📀</span>
                  )}
                </div>
                <h4 className="font-medium text-white truncate">{playlist.name}</h4>
                <p className="text-gray-400 text-sm">
                  {playlist.track_count || 0} tracks
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
