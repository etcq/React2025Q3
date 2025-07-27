import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Search from '../../pages/search/search';
import userEvent from '@testing-library/user-event';
import { type Mock } from 'vitest';
import { MemoryRouter } from 'react-router';

vi.mock('fetch');

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Displays fallbackUI and throw error when data array is empty', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByAltText('sad rick')).toBeInTheDocument();
    });
  });

  it('Get error when error button is clicked', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
        ],
      }),
    });
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /error/i });
    await waitFor(() => {
      expect(screen.queryByAltText('sad rick')).not.toBeInTheDocument();
    });
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByAltText('sad rick')).toBeInTheDocument();
    });
  });
});
