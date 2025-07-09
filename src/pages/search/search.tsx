import React from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import CardList from '../../components/card-list/card-list';

class Search extends React.Component {
  render() {
    return (
      <div className={style.search}>
        <h1>Search Page</h1>
        <SearchForm />
        <CardList />
      </div>
    );
  }
}

export default Search;
