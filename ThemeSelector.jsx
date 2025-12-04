import React, { useState } from 'react';
import { useThemeStore } from '../../stores/themeStore';

export default function ThemeSelector() {
  const { activeTheme, themes, setTheme, unlockSecret, secretUnlocked } = useThemeStore();
  const [secretCode, setSecretCode] = useState('');
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState('');

  const handleSecretSubmit = (e) => {
    e.preventDefault();
    if (unlockSecret(secretCode)) {
      setUnlockMessage('Blue Valentine unlocked! 💙');
      setSecretCode('');
      setTimeout(() => {
        setShowSecretInput(false);
        setUnlockMessage('');
      }, 2000);
    } else {
      setUnlockMessage('Invalid code');
      setTimeout(() => setUnlockMessage(''), 2000);
    }
  };

  const visibleThemes = Object.entries(themes).filter(
    ([key, theme]) => !theme.secret || secretUnlocked
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Themes</h3>
        <button
          onClick={() => setShowSecretInput(!showSecretInput)}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          🔐 Secret
        </button>
      </div>

      {showSecretInput && (
        <form onSubmit={handleSecretSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="Enter secret code..."
              className="flex-1 px-3 py-2 bg-fazwave-surface rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-fazwave-accent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-fazwave-accent rounded-lg text-white text-sm hover:bg-fazwave-secondary transition-colors"
            >
              Unlock
            </button>
          </div>
          {unlockMessage && (
            <p className={`mt-2 text-sm ${unlockMessage.includes('unlocked') ? 'text-green-400' : 'text-red-400'}`}>
              {unlockMessage}
            </p>
          )}
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {visibleThemes.map(([key, theme]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`relative p-3 rounded-xl transition-all duration-300 ${
              activeTheme === key
                ? 'ring-2 ring-white scale-105'
                : 'hover:scale-102 opacity-80 hover:opacity-100'
            }`}
            style={{
              background: theme.colors?.background || '#1a1a2e',
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: theme.colors?.primary }}
              />
              <span className="text-xs font-medium text-white drop-shadow-lg">
                {theme.name}
              </span>
              {theme.secret && (
                <span className="absolute top-1 right-1 text-xs">💎</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
