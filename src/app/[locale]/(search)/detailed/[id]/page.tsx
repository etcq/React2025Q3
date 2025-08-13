import { CharacterDetailed } from '../../../../../components/character-detailed/character-detailed';

interface IParams {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IParams) {
  const { id } = await params;
  return <CharacterDetailed id={id} />;
}
