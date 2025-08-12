import type { Metadata } from 'next';
import TanstackProvider from '../components/providers/tanstack-provider';
import { IChildrenNode } from '../core/interfaces/interface';
import { Montserrat } from 'next/font/google';
import '../assets/style/global.scss';
import ThemeProvider from '../components/providers/theme-provider';
import style from './root-layout.module.scss';
import { FlyoutCharacters } from '../components/flyout-characters/flyout-characters';
import { Header } from '../components/header/header';

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
          <ThemeProvider>
            <div className={style.wrapper} data-testid="main-wrapper">
              <div className={style.layout}>
                <Header />
                <main className={style['layout-content']}>{children}</main>
              </div>
              <FlyoutCharacters />
            </div>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
