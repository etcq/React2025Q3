import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MainLayout } from '../../components/main-layout/main-layout.tsx';

describe('MainLayout', () => {
  it('Should theme switch', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );
    const themeSwitcher = screen.getByTestId('theme-switcher');
    const mainLayout = screen.getByTestId('main-wrapper');
    expect(themeSwitcher).toBeInTheDocument();
    expect(mainLayout.className).toContain('dark');
    expect(mainLayout.className).not.toContain('light');
    fireEvent.click(themeSwitcher);
    expect(mainLayout.className).toContain('light');
    expect(mainLayout.className).not.toContain('dark');
  });
});
