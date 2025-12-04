import React from 'react';
import ThemeSelector from '../components/Theme/ThemeSelector';

export default function ThemesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Themes</h1>
      <p className="text-gray-400 mb-8">
        Customize your FazWave experience with unique animated themes
      </p>
      <ThemeSelector />
    </div>
  );
}
