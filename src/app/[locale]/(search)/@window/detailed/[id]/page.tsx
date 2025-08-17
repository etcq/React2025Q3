import { Suspense } from 'react';
import CharacterDetailed from '../../../../../../components/character-detailed/character-detailed.tsx';
import { getCachedData } from '../../../../../../lib/data/get-cached-data.ts';
import type { Character } from '../../../../../../core/interfaces/interface.ts';
import Loading from '../../../../../../components/loading/loading.tsx';

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IParams) {
  const { id } = await params;
  const data: Character = await getCachedData(id).then((data) => data);
  return (
    <Suspense fallback={<Loading />}>
      <CharacterDetailed data={data} />
    </Suspense>
  );
}
