import CardList from '../../../../components/card-list/card-list';
import { getCharacters } from '../../../../core/services/api-service';

export default async function CardListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page || '1';
  const data = await getCharacters(search, +page).then((char) => char);

  return <CardList data={data} />;
}
