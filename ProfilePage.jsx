import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { updateProfile } from '../api/xano';

export default function ProfilePage() {
  const { user, fetchUser } = useAuthStore();
  const [displayName, setDisplayName] = useState(user?.display_name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateProfile(user.id, { display_name: displayName, bio });
      await fetchUser();
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile');
    }
    setSaving(false);
  };

  if (!user) {
    return (
      <div className="text-center text-gray-400 py-12">
        Please sign in to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

      <div className="glass rounded-2xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fazwave-accent to-fazwave-secondary flex items-center justify-center text-4xl font-bold text-white">
            {user.display_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.display_name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-fazwave-surface rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fazwave-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-fazwave-surface rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fazwave-accent resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.includes('success')
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-fazwave-accent to-fazwave-secondary rounded-lg text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
