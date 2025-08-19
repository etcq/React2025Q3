'use client';

import { use } from 'react';
import style from './header.module.scss';
import ThemeContext from '@contexts';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n/navigation.ts';
import { LangSwitcher, ThemeSwitcher } from '@ui';

export function Header() {
  const { theme, toggleTheme } = use(ThemeContext);
  const t = useTranslations('Header');
  return (
    <div className={`${style.header}`}>
      <div className={style['header-text']}>
        <h1 className={style['header-main']}>{t('headerText')}</h1>
        <span className={style['header-secondary']}>{t('subtext')}</span>
      </div>
      <div className={style['header-feature']}>
        <Link href={'/about'} className={style['header-about-btn']}>
          {t('about')}
        </Link>
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <LangSwitcher />
      </div>
    </div>
  );
}
