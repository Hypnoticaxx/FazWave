import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { activeTheme, themes } = useThemeStore();

  const theme = themes[activeTheme];

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/browse', label: 'Browse', icon: '🔍' },
    { to: '/playlists', label: 'Playlists', icon: '📀' },
    { to: '/achievements', label: 'Achievements', icon: '🏆' },
    { to: '/themes', label: 'Themes', icon: '🎨' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <span
              className="text-xl font-bold"
              style={{ color: theme?.colors?.primary || '#6366f1' }}
            >
              FazWave
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'bg-fazwave-accent/20 text-fazwave-accent'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-fazwave-surface hover:bg-fazwave-surface-light transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fazwave-accent to-fazwave-secondary flex items-center justify-center text-white font-bold">
                    {user?.display_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <span className="text-white text-sm hidden sm:block">
                    {user?.display_name || 'User'}
                  </span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-xl overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:bg-fazwave-surface hover:text-white transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:bg-fazwave-surface hover:text-white transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-fazwave-surface transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-fazwave-accent rounded-lg text-white text-sm font-medium hover:bg-fazwave-secondary transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'bg-fazwave-accent/20 text-fazwave-accent'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
