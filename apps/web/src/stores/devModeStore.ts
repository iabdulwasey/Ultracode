import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DevModeState {
  isDevMode: boolean;
  setDevMode: (isDevMode: boolean) => void;
}

export const useDevModeStore = create<DevModeState>()(
  persist(
    (set) => ({
      isDevMode: false,
      setDevMode: (isDevMode: boolean) => set({ isDevMode }),
    }),
    {
      name: 'dev-mode-storage',
    }
  )
);