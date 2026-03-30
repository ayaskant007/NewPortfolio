import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useThemeStore = create(
  immer((set) => ({
    isDark: false,
    wallpaper: "/images/wallpaper.png",
    brightness: 100,
    bootPhase: "booting", // "booting" | "hello" | "desktop"

    toggleDark: () =>
      set((state) => {
        state.isDark = !state.isDark;
      }),
    setDark: (value) =>
      set((state) => {
        state.isDark = value;
      }),
    setWallpaper: (path) =>
      set((state) => {
        state.wallpaper = path;
      }),
    setBrightness: (value) =>
      set((state) => {
        state.brightness = Math.max(0, Math.min(100, value));
      }),
    setBootPhase: (phase) =>
      set((state) => {
        state.bootPhase = phase;
      }),
  })),
);

export default useThemeStore;
