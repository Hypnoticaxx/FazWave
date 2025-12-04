import React from 'react';
import TrackList from '../components/Tracks/TrackList';

export default function BrowsePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Browse</h1>
      <TrackList />
    </div>
  );
}
