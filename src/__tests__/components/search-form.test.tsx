import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  beforeEach(() => {
    localStorage.clear();
  });

  it('The input must be empty on initial render.', () => {
    render(<SearchForm query="" setQuery={() => {}} clickFn={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('');
  });

  it('The input must show the query string from the local storage.', () => {
    localStorage.setItem('search-query', 'test-query');
    const query = localStorage.getItem('search-query') || '';
    render(<SearchForm query={query} setQuery={() => {}} clickFn={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test-query');
  });

  it('should update input value on change', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Rick');
    expect(input).toHaveValue('Rick');
  });
});
