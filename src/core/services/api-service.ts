import type { Character } from '../interfaces/interface';

const API_BASE = 'https://rickandmortyapi.com/api';

const getCharacters = async (
  name: string
): Promise<Character[] | Error | undefined> => {
  const url = name
    ? `${API_BASE}/character/?name=${name}`
    : `${API_BASE}/character/?page=${1}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('No characters found');
  }
  return data.results.map(transformCharacterData);
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

export { getCharacters };
