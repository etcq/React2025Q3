import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchForm from '../../components/search-form/search-form';
import Search from '../../pages/search/search';

describe('SearchForm render', () => {
  it('Should render input', () => {
    render(<SearchForm clickFn={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('Should render button', () => {
    render(<SearchForm clickFn={() => {}} />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});

describe('SearchForm input values', () => {
  const clickFnMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('Shows empty input when no saved term exists', () => {
    localStorage.clear();
    render(<SearchForm clickFn={clickFnMock} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('search-query', 'test-query');
    render(<SearchForm clickFn={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test-query');
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.input(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('Rick');
  });

  it('Trims whitespace from search input before saving', async () => {
    render(<Search />);
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
    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue(
      'initial-query'
    );
  });

  it('Overwrites existing localStorage value when new search is performed', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: 'Search' });
    expect(localStorage.getItem('search-query')).toBe('initial-query');
    fireEvent.input(input, { target: { value: 'new query' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search-query')).toBe('new query');
  });
});
