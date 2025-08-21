import { create } from 'zustand';

interface ICountriesStore {
  countries: string[];
}

export const useCountryStore = create<ICountriesStore>()((set) => ({
  countries: ['Russia', 'USA', 'China'],
  addCountry: (country: string) =>
    set((state) => ({ ...state, countries: [...state.countries, country] })),
}));

export const countries = useCountryStore.getState().countries;
