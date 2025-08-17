'use client';
import { useEffect, useRef } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';
import { useTranslations } from 'next-intl';
import { LOCAL_STORAGE_KEY } from '../../core/constants/constants.ts';
import { useLocalStorage } from '../../core/hooks/use-local-storage.ts';
import { useParamsUpdate } from '../../core/hooks/use-params-update.ts';

export default function SearchForm() {
  const input = useRef<HTMLInputElement>(null);
  const f = useTranslations('SearchForm');
  const { savedQuery, setQueryToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);
  const { page, resetPage } = usePaginationStore((state) => state);
  useParamsUpdate(page, savedQuery);
  useEffect(() => {
    if (input.current) {
      input.current.value = savedQuery;
    }
  }, [savedQuery]);

  const handleClick = () => {
    const inputValue = input.current?.value.trim() || '';
    resetPage();
    setQueryToLocalStorage(inputValue);
  };

  return (
    <div className={style['search-form']}>
      <input
        type="text"
        className={style['search-form__input']}
        placeholder={`${f('search')}...`}
        ref={input}
      ></input>
      <Button callback={handleClick} text={f('search')} />
    </div>
  );
}
