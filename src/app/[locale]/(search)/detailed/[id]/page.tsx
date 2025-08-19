import { CharacterDetailed } from '@components';

interface IPageParams {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IPageParams) {
  const { id } = await params;
  return <CharacterDetailed id={id} />;
}
