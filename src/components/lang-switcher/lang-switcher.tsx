import { useTransition, ChangeEvent } from 'react';
import { routing } from '../../i18n/routing';
import style from './lang-switcher.module.scss';
import { usePathname, useRouter } from '../../i18n/navigation.ts';

export default function LangSwitcher() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  return (
    <select
      className={style['lang-switcher']}
      defaultValue={routing.defaultLocale}
      onChange={onSelectChange}
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
