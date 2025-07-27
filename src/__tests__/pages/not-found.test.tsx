import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../../App.tsx';

describe('NotFound page', () => {
  it('Redirect to not-found page if path is not found', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Error 404')).toBeInTheDocument();
    expect(screen.getByAltText('Not found')).toBeInTheDocument();
  });
  it('Not found page has back to main page button', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: 'Back to main' });
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.getByText('Error 404')).not.toBeInTheDocument();
    });
  });
});
