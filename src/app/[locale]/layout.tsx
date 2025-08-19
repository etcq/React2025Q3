import style from './locale-layout.module.scss';
import {
  FlyoutCharacters,
  Header,
  TanstackProvider,
  ThemeProvider,
} from '@components';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@i18n/routing';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700'],
  fallback: ['arial'],
  variable: '--font-montserrat',
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

interface ILocaleLayout {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: ILocaleLayout) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={montserrat.className}>
      <body>
        <TanstackProvider>
          <ThemeProvider>
            <NextIntlClientProvider>
              <div className={style.wrapper} data-testid="main-wrapper">
                <div className={style.layout}>
                  <Header />
                  <main className={style['layout-content']}>{children}</main>
                </div>
                <FlyoutCharacters />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
