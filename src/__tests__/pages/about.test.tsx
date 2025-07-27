import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AboutMe } from '../../pages/about/about.tsx';

describe('About Page', () => {
  it('About page must be rendered', () => {
    render(
      <MemoryRouter>
        <AboutMe />
      </MemoryRouter>
    );
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });
  it('About page have link to school page', () => {
    render(
      <MemoryRouter>
        <AboutMe />
      </MemoryRouter>
    );
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/');
  });
});
