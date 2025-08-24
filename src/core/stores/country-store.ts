import { create, type StateCreator } from 'zustand';

interface ICountriesStore {
  countries: string[];
  addCountry: (country: string) => void;
}

export const countryStoreCreator: StateCreator<ICountriesStore> = (set) => ({
  countries: ['Russia', 'USA', 'China'],
  addCountry: (country: string) =>
    set((state) => ({ ...state, countries: [...state.countries, country] })),
});

export const useCountryStore = create<ICountriesStore>()(countryStoreCreator);
