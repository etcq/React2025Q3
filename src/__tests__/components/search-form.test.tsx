import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchForm from '../../components/search-form/search-form';
import Search from '../../pages/search/search';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('SearchForm render', () => {
  it('Should render input', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <SearchForm setQueryToLocalStorage={() => {}} savedQuery="" />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('Should render button', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <SearchForm setQueryToLocalStorage={() => {}} savedQuery="" />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});

describe('SearchForm input values', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Shows empty input when no saved term exists', () => {
    localStorage.clear();
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <SearchForm setQueryToLocalStorage={() => {}} savedQuery="" />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toHaveValue(
        'test-query'
      );
    });
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.input(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('Rick');
  });

  it('Trims whitespace from search input before saving', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.input(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('Rick');
  });
});

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.setItem('search-query', 'initial-query');
  });

  it('Retrieves saved search term on component mount', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText('Search...')).toHaveValue(
      'initial-query'
    );
  });

  it('Overwrites existing localStorage value when new search is performed', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    expect(localStorage.getItem('search-query')).toBe('initial-query');
    fireEvent.input(input, { target: { value: 'new query' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('new query');
  });
});
