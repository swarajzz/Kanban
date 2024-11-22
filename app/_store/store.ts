import { create } from "zustand";

export const useBoardStore = create((set) => ({
  board: null,
  setBoard: (board) => set({ board }),
  resetBoard: () => set({ board: null }),
}));
