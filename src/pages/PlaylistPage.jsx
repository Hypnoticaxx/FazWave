import React, { useEffect, useState } from 'react';
import { getPlaylists } from '../api/xano';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await getPlaylists();
        setPlaylists(res.data || []);
      } catch (e) {
        console.error('Failed to fetch playlists:', e);
      }
      setLoading(false);
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fazwave-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Playlists</h1>

      {playlists.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg mb-4">No playlists available yet</p>
          <p className="text-sm">Check back later for curated playlists!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-fazwave-surface rounded-xl p-4 hover:bg-fazwave-surface-light transition-all cursor-pointer group hover:scale-102"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-fazwave-accent to-fazwave-secondary shadow-lg">
                {playlist.cover_url ? (
                  <img
                    src={playlist.cover_url}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl">📀</span>
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-white truncate mb-1">
                {playlist.name}
              </h4>
              <p className="text-gray-400 text-sm">
                {playlist.track_count || 0} tracks
              </p>
              {playlist.description && (
                <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                  {playlist.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
