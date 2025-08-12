import type { Metadata } from 'next';
import TanstackProvider from '../components/providers/tanstack-provider';
import { IChildrenNode } from '../core/interfaces/interface';
import { Montserrat } from 'next/font/google';
import { MainLayout } from '../components/main-layout/main-layout';
import '../assets/style/global.scss';

const montserrat = Montserrat({
  weight: ['400', '700'],
  fallback: ['arial'],
  variable: '--font-montserrat',
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rick and Morty DB',
  description: 'characters data base',
};

export default function RootLayout({ children }: IChildrenNode) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <TanstackProvider>
          <MainLayout>{children}</MainLayout>
        </TanstackProvider>
      </body>
    </html>
  );
}
