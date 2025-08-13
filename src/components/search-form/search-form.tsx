import { type FC, useEffect, useRef } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ISearchFormProps {
  savedQuery: string;
  setQueryToLocalStorage: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({
  savedQuery,
  setQueryToLocalStorage,
}) => {
  const input = useRef<HTMLInputElement>(null);
  const resetPage = usePaginationStore((state) => state.resetPage);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    if (input.current) {
      input.current.value = savedQuery;
    }
  }, [savedQuery]);

  const handleClick = () => {
    const inputValue = input.current?.value.trim() || '';
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set('search', inputValue);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
    resetPage();
    setQueryToLocalStorage(inputValue);
  };

  return (
    <div className={style['search-form']}>
      <input
        type="text"
        className={style['search-form__input']}
        placeholder="Search..."
        ref={input}
      ></input>
      <Button callback={handleClick} text="Search" />
    </div>
  );
};

export default SearchForm;
