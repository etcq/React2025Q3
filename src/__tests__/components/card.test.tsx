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
    const img = screen.getByRole('img');
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.status)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
    expect(screen.getByText(character.gender)).toBeInTheDocument();
    expect(img).toHaveAttribute('src', character.image);
  });
  it('Render another status', () => {
    const character: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Dead',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    };
    render(<Card data={character} />);
    expect(screen.getByText('Dead')).toBeInTheDocument();
  });
});
