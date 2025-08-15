import { revalidateTag } from 'next/cache';

export async function updateCharacter() {
  revalidateTag('character');
}
