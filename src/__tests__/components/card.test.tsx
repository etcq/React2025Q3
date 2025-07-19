import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../components/card-list/card/card';
import type { Character } from '../../core/interfaces/interface';

describe('Card content', () => {
  it('Renders correct character data', () => {
    const character: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    };

    render(<Card data={character} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });
});
