'use client';

import { useTransition, type ChangeEvent } from 'react';
import { routing } from '@i18n/routing.ts';
import style from './lang-switcher.module.scss';
import { usePathname, useRouter } from '@i18n/navigation.ts';
import { useLocale } from 'next-intl';

export function LangSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  return (
    <select
      className={style['lang-switcher']}
      defaultValue={locale}
      onChange={onSelectChange}
      disabled={isPending}
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
