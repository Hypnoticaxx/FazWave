import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from '../api/xano';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.login(email, password);
          const token = res.data.authToken || res.data.token;
          localStorage.setItem('fazwave_token', token);
          set({ token, isLoading: false });
          await get().fetchUser();
          return true;
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Login failed', 
            isLoading: false 
          });
          return false;
        }
      },

      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.signup(name, email, password);
          const token = res.data.authToken || res.data.token;
          localStorage.setItem('fazwave_token', token);
          set({ token, isLoading: false });
          await get().fetchUser();
          return true;
        } catch (err) {
          set({ 
            error: err.response?.data?.message || 'Signup failed', 
            isLoading: false 
          });
          return false;
        }
      },

      fetchUser: async () => {
        try {
          const res = await api.getMe();
          set({ user: res.data, isAuthenticated: true });
        } catch (err) {
          set({ user: null, isAuthenticated: false });
        }
      },

      logout: () => {
        localStorage.removeItem('fazwave_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'fazwave-auth',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
