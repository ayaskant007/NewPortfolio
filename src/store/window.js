import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

// Enhance config to include new properties
const enhancedConfig = Object.fromEntries(
  Object.entries(WINDOW_CONFIG).map(([k, v]) => [
    k,
    { ...v, isMinimized: false, isMaximized: false }
  ])
);

const useWindowStore = create(
  immer((set) => ({
    windows: enhancedConfig,
    nextZIndex: INITIAL_Z_INDEX + 1,
    activeWindow: "finder", // Default to finder (Desktop) context

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.isMinimized = false; // Restore if it was minimized
        win.zIndex = state.nextZIndex++;
        win.data = data ?? win.data;
        state.activeWindow = windowKey;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        if (state.activeWindow === windowKey) {
            // Find next topmost window
            const openWindows = Object.entries(state.windows).filter(([k,v]) => v.isOpen && !v.isMinimized);
            if (openWindows.length > 0) {
                openWindows.sort((a,b) => b[1].zIndex - a[1].zIndex);
                state.activeWindow = openWindows[0][0];
            } else {
                state.activeWindow = "finder";
            }
        }
      }),

    minimizeWindow: (windowKey) => 
      set((state) => {
          const win = state.windows[windowKey];
          if(!win) return;
          win.isMinimized = true;
          if (state.activeWindow === windowKey) {
            // Shift focus
            const openWindows = Object.entries(state.windows).filter(([k,v]) => v.isOpen && !v.isMinimized && k !== windowKey);
            if (openWindows.length > 0) {
                openWindows.sort((a,b) => b[1].zIndex - a[1].zIndex);
                state.activeWindow = openWindows[0][0];
            } else {
                state.activeWindow = "finder";
            }
          }
      }),

    maximizeWindow: (windowKey) =>
      set((state) => {
          const win = state.windows[windowKey];
          if(!win) return;
          win.isMaximized = !win.isMaximized; // Toggle logic
          if (!win.isMinimized) {
            win.zIndex = state.nextZIndex++;
            state.activeWindow = windowKey;
          }
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
        state.activeWindow = windowKey;
      }),
  })),
);

export default useWindowStore;
