'use client';

import { type FC, use } from 'react';
import style from './header.module.scss';
import ThemeContext from '../../core/contexts/contexts.ts';
import { ThemeSwitcher } from '../ui/theme-switcher/theme-switcher.tsx';
// import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation.ts';
import LangSwitcher from '../lang-switcher/lang-switcher.tsx';

export const Header: FC = () => {
  const { theme, toggleTheme } = use(ThemeContext);
  const t = useTranslations('Header');
  return (
    <div className={`${style.header}`}>
      <h1 className={style['header-main']}>{t('headerText')}</h1>
      <span className={style['header-secondary']}>{t('subtext')}</span>
      <Link href={'/about'} className={style['header-about-btn']}>
        {t('about')}
      </Link>
      <Link href={'/'} locale="ru">
        Switch ru
      </Link>
      <Link href={'/'} locale="en">
        Switch en
      </Link>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      <LangSwitcher />
    </div>
  );
};
