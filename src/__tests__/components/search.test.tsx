import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../../pages/search/search';
import * as apiService from '../../core/services/api-service.ts';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { response } from '../../mocks/mock-data.ts';

describe('Search page integration tests', () => {
  it('Manages loading states during API calls', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('Makes initial API call on component mount', () => {
    const apiCallSpy = vi.spyOn(apiService, 'getCharacters');
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    expect(apiCallSpy).toBeCalled();
  });

  it('Handles search term from localStorage on initial load', () => {
    localStorage.setItem('search-query', 'saved-query');
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('saved-query');
  });
});

describe('Search page API Integration Tests', () => {
  it('Calls API with correct parameters', () => {
    const apiCallSpy = vi.spyOn(apiService, 'getCharacters');
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.input(input, { target: { value: 'new-name' } });
    fireEvent.click(searchButton);
    expect(apiCallSpy).toBeCalledWith('new-name', 1);
  });
  it('Handles API error responses', async () => {
    vi.spyOn(apiService, 'getCharacters').mockResolvedValue({
      maxPage: 0,
      characters: [],
    });
    const spyError = vi.spyOn(console, 'error');
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const query = 'asdaqwqeqweqwe';
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await userEvent.type(input, query);
    await userEvent.click(searchButton);
    await waitFor(() => {
      expect(spyError).toBeCalled();
    });
  });
});

describe('Pagination tests', () => {
  vi.spyOn(apiService, 'getCharacters').mockResolvedValue(response);
  it('Move to prev and next page', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    const user = userEvent.setup();
    const pageCounter = screen.getByTestId('page-counter');
    const nextButton = screen.getByTestId('next');
    const prevButton = screen.getByTestId('prev');
    expect(pageCounter.textContent).toContain('1');
    expect(prevButton).toBeDisabled();
    await user.click(nextButton);
    expect(apiService.getCharacters).toHaveBeenCalledWith(expect.anything(), 2);
    await waitFor(() => {
      expect(pageCounter.textContent).toContain('2');
      expect(prevButton).not.toBeDisabled();
    });
  });
});
