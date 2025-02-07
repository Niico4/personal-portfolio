import { create } from 'zustand';

interface BackgroundStore {
  isActiveBgGradient: boolean;
  toggleChange: () => void;
  initializeState: () => void;
}

const useBackgroundStore = create<BackgroundStore>((set) => ({
  isActiveBgGradient: true,

  toggleChange: () =>
    set((state) => {
      const newState = !state.isActiveBgGradient;
      localStorage.setItem('active_background_gradient', newState.toString());
      return { isActiveBgGradient: newState };
    }),

  initializeState: () => {
    const storedValue = localStorage.getItem('active_background_gradient');
    if (storedValue !== null) {
      set({ isActiveBgGradient: storedValue === 'true' });
    }
  },
}));

export default useBackgroundStore;
