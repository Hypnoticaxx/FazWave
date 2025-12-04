import React, { useEffect, useState } from 'react';
import { getAchievements, getUserAchievements } from '../../api/xano';
import { useAuthStore } from '../../stores/authStore';

export default function AchievementList() {
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [allRes, userRes] = await Promise.all([
          getAchievements(),
          user ? getUserAchievements(user.id) : Promise.resolve({ data: [] }),
        ]);
        setAchievements(allRes.data || []);
        setUserAchievements(userRes.data || []);
      } catch (e) {
        console.error('Failed to fetch achievements:', e);
      }
      setLoading(false);
    };

    fetchAchievements();
  }, [user]);

  const isUnlocked = (achievementId) => {
    return userAchievements.some((ua) => ua.achievement_id === achievementId);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fazwave-accent"></div>
      </div>
    );
  }

  const unlockedCount = achievements.filter((a) => isUnlocked(a.id)).length;

  return (
    <div className="space-y-6">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              <span className="text-2xl">
                {['🎉', '✨', '🌟', '🎊', '💫'][Math.floor(Math.random() * 5)]}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
        <div className="text-sm text-gray-400">
          {unlockedCount} / {achievements.length} unlocked
        </div>
      </div>

      <div className="w-full bg-fazwave-surface rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-fazwave-accent to-fazwave-secondary transition-all duration-500"
          style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => {
          const unlocked = isUnlocked(achievement.id);
          return (
            <div
              key={achievement.id}
              onClick={() => unlocked && triggerConfetti()}
              className={`p-4 rounded-xl text-center transition-all cursor-pointer ${
                unlocked
                  ? 'bg-gradient-to-br from-fazwave-accent/20 to-fazwave-secondary/20 border border-fazwave-accent/50 hover:scale-105'
                  : 'bg-fazwave-surface opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">
                {unlocked ? achievement.icon || '🏆' : '🔒'}
              </div>
              <h4 className={`font-medium ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                {achievement.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {achievement.description}
              </p>
              {unlocked && (
                <div className="mt-2 text-xs text-fazwave-accent">Unlocked!</div>
              )}
            </div>
          );
        })}
      </div>

      {achievements.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No achievements available yet
        </div>
      )}
    </div>
  );
}
