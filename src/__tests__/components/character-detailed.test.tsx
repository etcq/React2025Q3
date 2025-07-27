import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import Search from '../../pages/search/search.tsx';
import * as apiService from '../../core/services/api-service.ts';
import { characterResponse, response } from '../../mocks/mock-data.ts';
import { CharacterDetailed } from '../../components/character-detailed/character-detailed.tsx';

describe('Character detailed', () => {
  vi.spyOn(apiService, 'getCharacters').mockResolvedValue(response);
  vi.spyOn(apiService, 'getCharacter').mockResolvedValue(characterResponse);
  it('render after click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Search />}>
            <Route path="detailed/:id" element={<CharacterDetailed />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('card')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('detailed')).toBeInTheDocument();
    });
  });
  it('render right information', async () => {
    render(
      <MemoryRouter initialEntries={['/detailed/1']}>
        <Routes>
          <Route path="/" element={<Search />}>
            <Route path="detailed/:id" element={<CharacterDetailed />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const header = await screen.findByTestId('detailed-header');
    expect(header).toBeInTheDocument();
    screen.debug();
    await waitFor(() => {
      expect(header).toHaveTextContent(characterResponse.name);
    });
    await waitFor(() => {
      expect(
        screen.getByAltText(`${characterResponse.name} image`)
      ).toBeInTheDocument();
      if (characterResponse.location) {
        expect(
          screen.getByText(`Last location: ${characterResponse.location.name}`)
        ).toBeInTheDocument();
      }
    });
  });
  it('back button work', async () => {
    render(
      <MemoryRouter initialEntries={['/detailed/1']}>
        <Routes>
          <Route path="/" element={<Search />}>
            <Route path="detailed/:id" element={<CharacterDetailed />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const backBtn = await screen.findByTestId('detailed-back-btn');
    fireEvent.click(backBtn);
    await waitFor(() => {
      expect(screen.queryByTestId('detailed-header')).not.toBeInTheDocument();
    });
  });
});
