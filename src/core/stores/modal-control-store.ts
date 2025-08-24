import { create, type StateCreator } from 'zustand';

interface IStoreModalControls {
  status: boolean;
  setModalStatus: (newStatus: boolean) => void;
}

export const modalControlCreator: StateCreator<IStoreModalControls> = (
  set
) => ({
  status: false,
  setModalStatus: (newStatus: boolean) =>
    set((state) => ({ ...state, status: newStatus })),
});

export const useModalControl =
  create<IStoreModalControls>()(modalControlCreator);
