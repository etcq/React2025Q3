import type { Metadata } from 'next';
import { IChildrenNode } from '../core/interfaces/interface';

export const metadata: Metadata = {
  title: 'Rick and Morty DB',
  description: 'characters data base',
};

export default async function RootLayout({ children }: IChildrenNode) {
  return children;
}
