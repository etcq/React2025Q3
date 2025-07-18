import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface';
import ErrorBoundary from '../../components/error-boundary/error-boundary';

describe('CardList render', () => {
  it('Renders correct number of items when data is provided', () => {
    const mockData: Character[] = [
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
    render(<CardList charList={mockData} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(3);
  });

  it('Displays "no results" message when data array is empty', () => {
    expect(() =>
      render(
        <ErrorBoundary>
          <CardList charList={[]} />
        </ErrorBoundary>
      )
    ).not.toThrow();

    expect(screen.getByText('No characters to display')).toBeInTheDocument();
  });

});