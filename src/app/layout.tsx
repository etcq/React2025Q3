import type { Metadata } from 'next';
import type { IChildrenNode } from '../core/interfaces/interface';
import '../assets/style/global.scss';

export const metadata: Metadata = {
  title: 'Rick and Morty DB',
  description: 'characters data base',
};

export default async function RootLayout({ children }: IChildrenNode) {
  return children;
}
