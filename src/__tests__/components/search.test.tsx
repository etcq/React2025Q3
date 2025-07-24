import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../../pages/search/search';
import * as apiService from '../../core/services/api-service.ts';
import { userEvent } from '@testing-library/user-event';

describe('Search page integration tests', () => {
  it('Manages loading states during API calls', async () => {
    render(<Search />);
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('Makes initial API call on component mount', () => {
    const apiCallSpy = vi.spyOn(apiService, 'getCharacters');
    render(<Search />);
    expect(apiCallSpy).toBeCalled();
  });

  it('Handles search term from localStorage on initial load', () => {
    localStorage.setItem('search-query', 'saved-query');
    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('saved-query');
  });
});

describe('Search page API Integration Tests', () => {
  it('Calls API with correct parameters', () => {
    const apiCallSpy = vi.spyOn(apiService, 'getCharacters');
    render(<Search />);
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.input(input, { target: { value: 'new-name' } });
    fireEvent.click(searchButton);
    expect(apiCallSpy).toBeCalledWith('new-name', 1);
  });
  it('Handles successful API responses', async () => {
    render(<Search />);
    const character = 'Morty';
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await userEvent.type(input, character);
    await userEvent.click(searchButton);
    await waitFor(() => {
      expect(screen.getAllByText(/morty/i).length).toBeGreaterThan(0);
      expect(screen.queryByText(/summer/i)).not.toBeInTheDocument();
    });
  });
  it('Handles API error responses', async () => {
    const spyError = vi.spyOn(console, 'error');
    render(<Search />);
    const query = 'InvalidInput';
    const input = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await userEvent.type(input, query);
    await userEvent.click(searchButton);
    await waitFor(() => {
      expect(spyError).toBeCalled();
    });
  });
});
