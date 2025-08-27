import { create, type StateCreator } from 'zustand';

interface IStoreModalControls {
  isShown: boolean;
  setIsShown: (newStatus: boolean) => void;
}

export const modalControlCreator: StateCreator<IStoreModalControls> = (
  set
) => ({
  isShown: false,
  setIsShown: (newShownStatus: boolean) =>
    set(() => ({ isShown: newShownStatus })),
});

export const useModalControl =
  create<IStoreModalControls>()(modalControlCreator);
