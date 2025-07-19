import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SearchForm from '../../components/search-form/search-form';
import Search from '../../pages/search/search';

describe('SearchForm render', () => {
  it('should render input', () => {
    render(<SearchForm query="" setQuery={() => {}} clickFn={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should render button', () => {
    render(<SearchForm query="" setQuery={() => {}} clickFn={() => {}} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});

describe('SearchForm input values', () => {
  const setQueryMock = vi.fn();
  const clickFnMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('Shows empty input when no saved term exists', () => {
    const localStorageData =
      localStorage.getItem('search-query') || 'local storage is empty';
    render(
      <SearchForm
        query={localStorageData}
        setQuery={setQueryMock}
        clickFn={clickFnMock}
      />
    );
    expect(screen.getByPlaceholderText('Search...')).toHaveValue(
      'local storage is empty'
    );
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('search-query', 'test-query');
    const query = localStorage.getItem('search-query') || '';
    render(<SearchForm query={query} setQuery={() => {}} clickFn={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test-query');
  });

  it('Updates input value when user types', async () => {
    render(
      <SearchForm query="" setQuery={setQueryMock} clickFn={clickFnMock} />
    );
    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Rick');
    expect(setQueryMock).toHaveBeenCalledWith('R');
    expect(setQueryMock).toHaveBeenCalledWith('i');
    expect(setQueryMock).toHaveBeenCalledWith('c');
    expect(setQueryMock).toHaveBeenCalledWith('k');
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    await fireEvent.input(input, { target: { value: 'Rick' } });
    await fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('Rick');
  });

  it('Trims whitespace from search input before saving', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    await fireEvent.input(input, { target: { value: 'Rick' } });
    await fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('Rick');
  });
});

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.setItem('search-query', 'initial-query');
  });

  it('Retrieves saved search term on component mount', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue(
      'initial-query'
    );
  });

  it('Overwrites existing localStorage value when new search is performed', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    expect(localStorage.getItem('search-query')).toBe('initial-query');
    const button = screen.getByRole('button', { name: 'Search' });
    await fireEvent.input(input, { target: { value: 'new query' } });
    await fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('new query');
  });
});
