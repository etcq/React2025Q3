import { describe, expect, it, vi, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../../components/search/search';
import * as apiService from '../../core/services/api-service.ts';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { response } from '../../mocks/mock-data.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Search page integration tests', () => {
  it('Manages loading states during API calls', async () => {
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('Makes initial API call on component mount', async () => {
    const apiCallSpy = vi.spyOn(apiService, 'getCharacters');
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(apiCallSpy).toBeCalled();
    });
  });

  it('Handles search term from localStorage on initial load', () => {
    localStorage.setItem('search-query', 'saved-query');
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('saved-query');
  });
});

describe('Search page API Integration Tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Calls API with correct parameters', () => {
    const apiCallSpy = vi.spyOn(apiService, 'getCharacters');
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.input(input, { target: { value: 'new-name' } });
    fireEvent.click(searchButton);
    expect(apiCallSpy).toBeCalledWith('new-name', 1);
  });
  it('Handles API error responses', async () => {
    vi.spyOn(apiService, 'getCharacters').mockRejectedValue(
      new Error('API Error')
    );
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const query = 'invalidinput';
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    await userEvent.type(input, query);
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});

describe('Pagination tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Move page button work', async () => {
    vi.spyOn(apiService, 'getCharacters').mockResolvedValue(response);
    const queryClient = new QueryClient();
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    const user = userEvent.setup();
    const nextButton = screen.getByTestId('next');
    const prevButton = screen.getByTestId('prev');
    expect(screen.getByTestId('page-counter').textContent).toContain('1');
    expect(prevButton).toBeDisabled();
    await user.click(nextButton);
    await waitFor(() => {
      expect(screen.getByTestId('page-counter').textContent).toContain('2');
    });
  });
});
