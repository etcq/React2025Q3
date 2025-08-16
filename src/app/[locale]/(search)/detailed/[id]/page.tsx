import { Suspense } from 'react';
import CharacterDetailed from '../../../../../components/character-detailed/character-detailed';
import { getCachedData } from '../../../../../lib/data/get-cached-data.ts';
import type { Character } from '../../../../../core/interfaces/interface';
interface IParams {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IParams) {
  const { id } = await params;
  const data: Character = await getCachedData(id).then((data) => data);
  return (
    <Suspense>
      <CharacterDetailed data={data} />
    </Suspense>
  );
}
