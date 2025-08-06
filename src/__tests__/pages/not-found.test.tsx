import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../../App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('NotFound page', () => {
  it('Redirect to not-found page if path is not found', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByAltText('Not found')).toBeInTheDocument();
  });
  it('Not found page has back to main page button', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/invalid-path']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const button = screen.getByRole('button', { name: 'Back to main' });
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.getByText('Error 404')).not.toBeInTheDocument();
    });
  });
});
