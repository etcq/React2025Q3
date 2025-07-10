import type { Character } from '../interfaces/interface';

const API_BASE = 'https://rickandmortyapi.com/api';

const getAllCharacters = async (): Promise<Character | undefined> => {
  const url = `${API_BASE}/character/?page=${1}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Can't fetching data. Status: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data.results.map(transformCharacterData);
  } catch (error) {
    console.log(error);
  }
};

const getFilteredCharacters = async (name: string): Promise<void> => {
  const url = `${API_BASE}/character/?name=${name}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Can't fetching data. Status: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data.results.map(transformCharacterData);
  } catch (error) {
    console.log(error);
  }
};

const transformCharacterData = (character: Character): Character => {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    status: character.status,
    gender: character.gender,
    species: character.species,
  };
};

export { getAllCharacters, getFilteredCharacters };
