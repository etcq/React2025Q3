import React, { type ChangeEvent } from 'react';
import Button from '../ui/button/button';
import style from './search-form.module.scss';

class SearchForm extends React.Component {
  state = {
    query: '',
  };

  componentDidMount(): void {
    this.setState({ query: localStorage.getItem('search-query') });
  }

  handleChange = (e: ChangeEvent) => {
    if (e && e.target instanceof HTMLInputElement) {
      const value = e.target.value;
      this.setState({ query: value });
    }
  };

  render(): React.ReactNode {
    return (
      <div className={style['search-form']}>
        <input
          type="text"
          className={style['search-form__input']}
          onChange={(e) => this.handleChange(e)}
          value={this.state.query}
          placeholder="Search..."
        ></input>
        <Button
          callback={() => {
            localStorage.setItem('search-query', this.state.query);
          }}
        />
      </div>
    );
  }
}

export default SearchForm;
