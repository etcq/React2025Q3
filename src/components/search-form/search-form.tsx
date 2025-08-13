import { type FC, useEffect, useRef } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';
import { useTranslations } from 'next-intl';

interface ISearchFormProps {
  savedQuery: string;
  setQueryToLocalStorage: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({
  savedQuery,
  setQueryToLocalStorage,
}) => {
  const input = useRef<HTMLInputElement>(null);
  const f = useTranslations('SearchForm');
  const resetPage = usePaginationStore((state) => state.resetPage);

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
};

export default SearchForm;
