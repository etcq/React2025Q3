import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
// import CardList from '../../components/card-list/card-list';
// import ErrorBoundary from '../../components/error-boundary/error-boundary';
import Search from '../../pages/search/search';
import userEvent from '@testing-library/user-event';
import { type Mock } from 'vitest';

vi.mock('fetch');

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Displays fallbackUI and throw error when data array is empty', async () => {
    await (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    render(<Search />);
    await waitFor(() => {
      expect(screen.getByAltText('sad rick')).toBeInTheDocument();
    });
  });

  it('Get error when error button is clicked', async () => {
    await (globalThis.fetch as Mock).mockResolvedValueOnce({
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
    render(<Search />);
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
