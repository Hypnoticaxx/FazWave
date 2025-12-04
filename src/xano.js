import axios from "axios";

const API_BASE = "https://x8ki-letl-twmt.n7.xano.io/api:LtSwFmWE";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fazwave_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("fazwave_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const signup = (name, email, password) =>
  api.post("/auth/signup", { name, email, password });

export const getMe = () => api.get("/auth/me");

export const getTracks = () => api.get("/track");

export const getTrackById = (id) => api.get(`/track/${id}`);

export const getLyrics = () => api.get("/lyric");

export const getLyricsByTrackId = (trackId) =>
  api.get(`/lyric?track_id=${trackId}`);

export const getPlaylists = () => api.get("/playlist");

export const getPlaylistById = (id) => api.get(`/playlist/${id}`);

export const getThemes = () => api.get("/theme");

export const getUserThemes = (userId) =>
  api.get(`/user_theme?user_id=${userId}`);

export const getAchievements = () => api.get("/achievement");

export const getUserAchievements = (userId) =>
  api.get(`/user_achievement?user_id=${userId}`);

export const getUserFavorites = (userId) =>
  api.get(`/user_favorite_track?user_id=${userId}`);

export const addToFavorites = (userId, trackId) =>
  api.post("/user_favorite_track", { user_id: userId, track_id: trackId });

export const removeFromFavorites = (favoriteId) =>
  api.delete(`/user_favorite_track/${favoriteId}`);

export const getUserHistory = (userId) =>
  api.get(`/user_listen_history?user_id=${userId}`);

export const addToHistory = (userId, trackId) =>
  api.post("/user_listen_history", {
    user_id: userId,
    track_id: trackId,
    listened_at: new Date().toISOString(),
  });

export const updateProfile = (userId, data) =>
  api.patch(`/user/${userId}`, data);

export const searchTracks = (query) =>
  api.get(`/track?search=${encodeURIComponent(query)}`);

export default api;
