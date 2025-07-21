import type { ChangeEvent, FC } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';

interface ISearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  clickFn: () => void;
}

const SearchForm: FC<ISearchFormProps> = (props: ISearchFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.setQuery(value.trim());
  };

  return (
    <div className={style['search-form']}>
      <input
        type="text"
        className={style['search-form__input']}
        onChange={handleChange}
        value={props.query}
        placeholder="Search..."
      ></input>
      <Button
        callback={() => {
          localStorage.setItem('search-query', props.query);
          props.clickFn();
        }}
        text="Search"
      />
    </div>
  );
};

export default SearchForm;
