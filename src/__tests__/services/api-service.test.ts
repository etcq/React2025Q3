import { describe, it, expect, vi } from 'vitest';
import { getCharacters } from '../../core/services/api-service';

describe('API service work', () => {
  it('Gets all characters if query string is empty', async () => {
    const characters = (await getCharacters('', 1)).characters;
    expect(characters).toBeDefined();
    expect(characters?.length).toBe(20);
  });
  it('Gets characters by name', async () => {
    const characters = (await getCharacters('rick', 1)).characters;
    expect(Array.isArray(characters)).toBe(true);
    expect(characters[0].name).toMatch(/rick/i);
    expect(characters[1].name).toMatch(/rick/i);
    expect(characters[2].name).toMatch(/rick/i);
    expect(characters[3].name).not.toMatch(/morty/i);
  });
  it('If no characters are found, throw an error.', async () => {
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(getCharacters('charnotfound', 1)).rejects.toThrowError();
    expect(spyError).toBeCalled();
    spyError.mockRestore();
  });
});
