import { Suspense } from 'react';
import CharacterDetailed from '../../../../../components/character-detailed/character-detailed';
import { unstable_cache } from 'next/cache';
import { getCharacter } from '../../../../../core/services/api-service';
import type { Character } from '../../../../../core/interfaces/interface';
interface IParams {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IParams) {
  const { id } = await params;
  const getCachedData = unstable_cache(
    async () => {
      console.log('data validate with Rick Morty API');
      return getCharacter(id);
    },
    [id],
    {
      tags: ['character'],
      revalidate: 5000,
    }
  );
  const data: Character = await getCachedData().then((data) => data);
  return (
    <Suspense>
      <CharacterDetailed data={data} />
    </Suspense>
  );
}
