import { create } from "zustand";
import { BoardProps, ColumnProps } from "../_types/types";

interface BoardStore {
  board: BoardProps | null;
  columns: ColumnProps[];
  setBoard: (board: BoardProps) => void;
  setColumns: (columns: ColumnProps[]) => void;
  resetBoard: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  board: null,
  columns: [],
  setBoard: (board: BoardProps) => set({ board }),
  setColumns: (columns: ColumnProps[]) => set({ columns }),
  resetBoard: () => set({ board: null }),
}));
