import type { Character } from '../interfaces/interface';

const API_BASE = 'https://rickandmortyapi.com/api';

interface ICharacterResponse {
  maxPage: number;
  characters: Character[];
}

const getCharacters = async (
  name: string,
  page: number
): Promise<ICharacterResponse> => {
  const url = name
    ? `${API_BASE}/character/?name=${name}&page=${page}`
    : `${API_BASE}/character/?page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    console.error('No characters found');
    throw new Error('No characters found');
  }
  return {
    maxPage: data.info.pages,
    characters: data.results.map(transformCharacterData),
  };
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
