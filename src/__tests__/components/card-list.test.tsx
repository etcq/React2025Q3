import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface';
import Search from '../../pages/search/search';

vi.mock('fetch');

describe('CardList content', () => {
  let response: Character[];
  beforeEach(() => {
    response = [
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
  });

  it('Renders correct number of items when data is provided', () => {
    render(<CardList charList={response} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(3);
  });

  it('Shows loading state while fetching data', async () => {
    render(<Search />);
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  });
});
