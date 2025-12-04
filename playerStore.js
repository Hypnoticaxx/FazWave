import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  queue: [],
  queueIndex: 0,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
  isMuted: false,
  isShuffled: false,
  repeatMode: 'none',
  quality: 'high',
  isPiP: false,
  isFullscreen: false,
  showLyrics: true,
  audioRef: null,
  beatIntensity: 0,

  setAudioRef: (ref) => set({ audioRef: ref }),

  setCurrentTrack: (track) => {
    set({ currentTrack: track, progress: 0 });
  },

  setQueue: (tracks, startIndex = 0) => {
    set({ queue: tracks, queueIndex: startIndex });
    if (tracks[startIndex]) {
      get().setCurrentTrack(tracks[startIndex]);
    }
  },

  play: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.play().catch(console.error);
    }
    set({ isPlaying: true });
  },

  pause: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.pause();
    }
    set({ isPlaying: false });
  },

  togglePlay: () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) pause();
    else play();
  },

  next: () => {
    const { queue, queueIndex, isShuffled, repeatMode, setCurrentTrack } = get();
    if (queue.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (queueIndex < queue.length - 1) {
      nextIndex = queueIndex + 1;
    } else if (repeatMode === 'all') {
      nextIndex = 0;
    } else {
      return;
    }

    set({ queueIndex: nextIndex });
    setCurrentTrack(queue[nextIndex]);
  },

  previous: () => {
    const { queue, queueIndex, progress, setCurrentTrack } = get();
    if (queue.length === 0) return;

    if (progress > 3) {
      set({ progress: 0 });
      return;
    }

    const prevIndex = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
    set({ queueIndex: prevIndex });
    setCurrentTrack(queue[prevIndex]);
  },

  setVolume: (volume) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.volume = volume;
    }
    set({ volume, isMuted: volume === 0 });
  },

  toggleMute: () => {
    const { isMuted, volume, audioRef } = get();
    if (audioRef) {
      audioRef.volume = isMuted ? volume : 0;
    }
    set({ isMuted: !isMuted });
  },

  setProgress: (progress) => set({ progress }),

  seek: (time) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.currentTime = time;
    }
    set({ progress: time });
  },

  setDuration: (duration) => set({ duration }),

  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),

  toggleRepeat: () => {
    const { repeatMode } = get();
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    set({ repeatMode: nextMode });
  },

  setQuality: (quality) => set({ quality }),

  togglePiP: () => set((state) => ({ isPiP: !state.isPiP })),

  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),

  toggleLyrics: () => set((state) => ({ showLyrics: !state.showLyrics })),

  setBeatIntensity: (intensity) => set({ beatIntensity: intensity }),
}));
