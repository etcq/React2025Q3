import { unstable_cache } from 'next/cache';
import { getCharacter } from '../../core/services/api-service.ts';

export const getCachedData = unstable_cache(
  async (id: string) => {
    console.log('data validate with Rick Morty API');
    return getCharacter(id);
  },
  [],
  {
    tags: ['character'],
    revalidate: 5000,
  }
);
