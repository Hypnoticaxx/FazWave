import React, { useEffect, useState, useRef } from 'react';
import { getLyricsByTrackId } from '../../api/xano';
import { usePlayerStore } from '../../stores/playerStore';
import { formatLyricWithRomanization } from '../../utils/romanize';

export default function LyricsPanel({ trackId }) {
  const [lyrics, setLyrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRomanized, setShowRomanized] = useState(true);
  const { progress } = usePlayerStore();
  const lyricsRef = useRef(null);
  const activeLineRef = useRef(null);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!trackId) {
        setLyrics([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await getLyricsByTrackId(trackId);
        const trackLyrics = (res.data || [])
          .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setLyrics(trackLyrics);
      } catch (e) {
        console.error('Failed to fetch lyrics:', e);
        setError('Could not load lyrics');
        setLyrics([]);
      }
      setLoading(false);
    };

    fetchLyrics();
  }, [trackId]);

  useEffect(() => {
    if (activeLineRef.current && lyricsRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [progress]);

  const getActiveLine = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (lyrics[i].timestamp && progress >= lyrics[i].timestamp) {
        return i;
      }
    }
    return -1;
  };

  const activeLine = getActiveLine();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-fazwave-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>{error}</p>
      </div>
    );
  }

  if (lyrics.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>No lyrics available</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">Lyrics</h3>
        <button
          onClick={() => setShowRomanized(!showRomanized)}
          className={`text-xs px-2 py-1 rounded ${
            showRomanized
              ? 'bg-fazwave-accent text-white'
              : 'bg-fazwave-surface text-gray-400'
          }`}
        >
          Romanized
        </button>
      </div>
      
      <div
        ref={lyricsRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
      >
        {lyrics.map((line, index) => {
          const isActive = index === activeLine;
          const { original, romanized, language } = formatLyricWithRomanization(
            line.text,
            showRomanized
          );

          return (
            <div
              key={line.id || index}
              ref={isActive ? activeLineRef : null}
              className={`transition-all duration-300 ${
                isActive
                  ? 'text-white text-lg font-semibold scale-105 text-shadow-glow'
                  : index < activeLine
                  ? 'text-gray-500 text-base'
                  : 'text-gray-400 text-base'
              }`}
            >
              <p className="leading-relaxed">{original}</p>
              {romanized && language !== 'other' && (
                <p className="text-sm mt-1 opacity-70 italic">{romanized}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
