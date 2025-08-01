import { type FC, use, useEffect, useRef } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';
import ThemeContext from '../../core/contexts/contexts.ts';

interface ISearchFormProps {
  resetPage: () => void;
  savedQuery: string;
  setQueryToLocalStorage: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({
  resetPage,
  savedQuery,
  setQueryToLocalStorage,
}) => {
  const input = useRef<HTMLInputElement>(null);
  const { theme } = use(ThemeContext);
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
    <div className={`${style['search-form']} ${style[theme]}`}>
      <input
        type="text"
        className={style['search-form__input']}
        placeholder="Search..."
        ref={input}
      ></input>
      <Button
        callback={handleClick}
        text="Search"
        className={style[`${theme}-btn`]}
      />
    </div>
  );
};

export default SearchForm;
