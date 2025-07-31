import { create } from 'zustand';
import type { Character } from '../interfaces/interface';

interface ICharacter {
  characters: Character[];
  selectCharacters: (newCharacter: Character) => void;
  unselectCharacter: (id: number) => void;
  unselectAllCharacters: () => void;
}

export const useCharactersStore = create<ICharacter>()((set) => ({
  characters: [],
  selectCharacters: (newCharacter: Character) =>
    set((state) => ({
      characters: [...state.characters, newCharacter],
    })),
  unselectCharacter: (id: number) =>
    set((state) => ({
      characters: state.characters.filter((character) => character.id !== id),
    })),
  unselectAllCharacters: () =>
    set(() => ({
      characters: [],
    })),
}));
