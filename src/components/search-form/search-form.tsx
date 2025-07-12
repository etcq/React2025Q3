import React, { type ChangeEvent } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';

interface ISearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  clickFn: () => void;
}

class SearchForm extends React.Component<ISearchFormProps> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.props.setQuery(value);
  };

  render(): React.ReactNode {
    return (
      <div className={style['search-form']}>
        <input
          type="text"
          className={style['search-form__input']}
          onChange={this.handleChange}
          value={this.props.query}
          placeholder="Search..."
        ></input>
        <Button
          callback={() => {
            localStorage.setItem('search-query', this.props.query);
            this.props.clickFn();
          }}
        />
      </div>
    );
  }
}

export default SearchForm;
