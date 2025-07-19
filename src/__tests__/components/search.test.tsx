import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Search from '../../pages/search/search';

describe('Search component', () => {
  it('Shows loading state while fetching data', async () => {
    render(<Search />);
    const loading = await screen.findByText('Loading...');
    expect(loading).toBeInTheDocument();
  });
});
