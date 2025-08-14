import { create } from 'zustand';

interface ICharacter {
  characters: number[];
  selectCharacters: (newCharacterId: number) => void;
  unselectCharacter: (id: number) => void;
  unselectAllCharacters: () => void;
}

export const useSelectCharactersStore = create<ICharacter>()((set) => ({
  characters: [],
  selectCharacters: (newCharacterId: number) =>
    set((state) => ({
      characters: [...state.characters, newCharacterId],
    })),
  unselectCharacter: (characterId: number) =>
    set((state) => ({
      characters: state.characters.filter((id) => id !== characterId),
    })),
  unselectAllCharacters: () =>
    set(() => ({
      characters: [],
    })),
}));
