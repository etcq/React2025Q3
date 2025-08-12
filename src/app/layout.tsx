import type { Metadata } from 'next';
import TanstackProvider from '../components/providers/tanstack-provider';
import { IChildrenNode } from '../core/interfaces/interface';

export const metadata: Metadata = {
  title: 'Rick and Morty DB',
  description: 'characters data base',
};

export default function RootLayout({ children }: IChildrenNode) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
