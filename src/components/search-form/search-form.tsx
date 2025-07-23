import { useRef, useEffect, type FC } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../core/constants/constants';

interface ISearchFormProps {
  clickFn: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ clickFn }) => {
  const { savedQuery, setQueryLS } = useLocalStorage(LOCAL_STORAGE_KEY);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.value = savedQuery;
    }
  }, [savedQuery]);

  return (
    <div className={style['search-form']}>
      <input
        type="text"
        className={style['search-form__input']}
        placeholder="Search..."
        ref={input}
      ></input>
      <Button
        callback={() => {
          const inputValue = input.current?.value.trim() || '';
          setQueryLS(inputValue);
          clickFn(inputValue);
        }}
        text="Search"
      />
    </div>
  );
};

export default SearchForm;
