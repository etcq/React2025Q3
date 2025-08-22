import { create } from 'zustand';

interface IStoreModalControls {
  status: boolean;
  setModalStatus: (newStatus: boolean) => void;
}

export const useModalControl = create<IStoreModalControls>()((set) => ({
  status: false,
  setModalStatus: (newStatus: boolean) =>
    set((state) => ({ ...state, status: newStatus })),
}));
