import type { NextRequest } from 'next/server';
import type { Character } from '@interfaces';
import { convertToCSV } from '@utils/convert-to-csv';
import { getCharacter } from '@services/api-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const count = searchParams.get('count');
  const ids = searchParams.get('ids')?.split(',');
  try {
    if (!ids) throw new Error('character ids not found');
    const data: Character[] = await Promise.all(
      ids.map((id) => getCharacter(id))
    );
    const csv = convertToCSV(data);
    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${count}_items.csv"`,
        'Content-Type': 'text/csv',
        'Cache-controls': 'no-store',
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return new Response(e.message, {
        status: 400,
      });
    }
  }
}
