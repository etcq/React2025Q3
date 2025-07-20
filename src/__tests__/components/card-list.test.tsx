import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface';

const response: Character[] = [
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
];

describe('CardList content', () => {
  it('Renders correct number of items when data is provided', () => {
    render(<CardList charList={response} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(3);
  });
  it('Renders correct items', () => {
    render(<CardList charList={response} />);
    const cards = screen.getAllByTestId('card');
    expect(cards[0]).toHaveTextContent('Rick Sanchez');
    expect(cards[0]).toHaveTextContent('Alive');
    expect(cards[1]).toHaveTextContent('Morty Smith');
    expect(cards[1]).toHaveTextContent('Human');
    expect(cards[2]).toHaveTextContent('Summer Smith');
  });
});
