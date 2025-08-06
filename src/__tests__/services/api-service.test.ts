import { describe, expect, it, vi } from 'vitest';
import * as apiService from '../../core/services/api-service';
import { getCharacters } from '../../core/services/api-service';
import { response } from '../../mocks/mock-data.ts';

describe('API service work', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Gets all characters if query string is empty', async () => {
    vi.spyOn(apiService, 'getCharacters').mockResolvedValue(response);
    const responseData = await getCharacters('', 1);
    expect(responseData).toBeDefined();
    expect(responseData.characters.length).toBe(3);
  });

  it('Gets characters by name', async () => {
    vi.spyOn(apiService, 'getCharacters').mockResolvedValue({
      maxPage: 1,
      characters: [response.characters[0]],
    });
    const characters = (await getCharacters('rick', 1)).characters;
    expect(Array.isArray(characters)).toBe(true);
    expect(characters[0].name).toMatch(/rick/i);
    expect(characters.length).toBe(1);
  });

  it('If no characters are found, throw an error.', async () => {
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(getCharacters('charnotfound', 1)).rejects.toThrowError();
    expect(spyError).toBeCalled();
    spyError.mockRestore();
  });
});
