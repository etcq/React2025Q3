import { useRef, useEffect, type FC } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';

interface ISearchFormProps {
  clickFn: (query: string, page: number) => void;
  setPage: (page: number) => void;
  savedQuery: string;
  setQueryLS: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({
  clickFn,
  setPage,
  savedQuery,
  setQueryLS,
}) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.value = savedQuery;
    }
  }, [savedQuery]);

  const handleClick = () => {
    const inputValue = input.current?.value.trim() || '';
    setPage(1);
    setQueryLS(inputValue);
    clickFn(inputValue, 1);
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
