import type {
  Character,
  ICharacterResponse,
} from '../core/interfaces/interface.ts';

export const response: ICharacterResponse = {
  maxPage: 3,
  characters: [
    {
      gender: 'Male',
      id: 1,
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      name: 'Rick Sanchez',
      species: 'Human',
      status: 'Alive',
    },
    {
      gender: 'Male',
      id: 2,
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      name: 'Morty Smith',
      species: 'Human',
      status: 'Alive',
    },
    {
      gender: 'Female',
      id: 3,
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      name: 'Summer Smith',
      species: 'Human',
      status: 'Alive',
    },
  ],
};

export const characterResponse: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    // ...
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};
