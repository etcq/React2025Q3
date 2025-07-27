import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from '../../components/card-list/card-list';
import { MemoryRouter } from 'react-router';
import { response } from '../../mocks/mock-data.ts';

describe('CardList content', () => {
  it('Renders correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <CardList charList={response.characters} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(3);
  });
  it('Renders correct items', () => {
    render(
      <MemoryRouter>
        <CardList charList={response.characters} />
      </MemoryRouter>
    );
    const cards = screen.getAllByTestId('card');
    expect(cards[0]).toHaveTextContent('Rick Sanchez');
    expect(cards[0]).toHaveTextContent('Alive');
    expect(cards[1]).toHaveTextContent('Morty Smith');
    expect(cards[1]).toHaveTextContent('Human');
    expect(cards[2]).toHaveTextContent('Summer Smith');
  });
});
