import { create } from 'zustand';
import type { TFormSchema } from '../schema/form-validation.schema';

export type TConvertedForm = Omit<TFormSchema, 'picture'> & {
  picture: string;
  picture_base64: string;
};

interface IStoreFromInformation {
  information: TConvertedForm[];
  setInformation: (newInformation: TConvertedForm) => void;
}

export const useFormInformationStore = create<IStoreFromInformation>()(
  (set) => ({
    information: [],
    setInformation: (newInformation: TConvertedForm) =>
      set((state) => ({
        ...state,
        information: [newInformation, ...state.information],
      })),
  })
);
