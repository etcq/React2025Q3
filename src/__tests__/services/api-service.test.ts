import { describe, it, expect } from 'vitest';
import { getCharacters } from '../../core/services/api-service';

describe('API service work', () => {
  it('Gets all characters if query string is empty', async () => {
    const characters = await getCharacters('');
    expect(characters).toBeDefined();
    expect(characters?.length).toBe(20);
  });
});
