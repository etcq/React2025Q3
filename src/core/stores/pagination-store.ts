import { create } from 'zustand';

interface IPagination {
  page: number;
  maxPage: number;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
  setMaxPage: (newMaxPage: number) => void;
}

export const usePaginationStore = create<IPagination>()((set) => ({
  page: 1,
  maxPage: 1,
  nextPage: () => set((state) => ({ ...state, page: state.page + 1 })),
  prevPage: () => set((state) => ({ ...state, page: state.page - 1 })),
  resetPage: () => set((state) => ({ ...state, page: 1 })),
  setMaxPage: (newMaxPage: number) =>
    set((state) => ({ ...state, maxPage: newMaxPage })),
}));
