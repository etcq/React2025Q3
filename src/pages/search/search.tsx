import React from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface.ts';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import {
  getAllCharacters,
  getFilteredCharacters,
} from '../../core/services/api-service.ts';
import bgPath from '../../assets/image/rick-and-morty-bg.jpg';

class Search extends React.Component {
  state: { query: string; charList: Character[] } = {
    query: '',
    charList: [],
  };

  componentDidMount(): void {
    this.setState({ query: localStorage.getItem('search-query') });
  }

  handleClick = () => {
    if (this.state.query === '') {
      getAllCharacters().then((newCharList) => {
        this.setState({ charList: newCharList });
      });
    } else {
      getFilteredCharacters(this.state.query).then((newCharList) => {
        this.setState({ charList: newCharList });
      });
    }
  };

  render() {
    return (
      <div
        className={style.search}
        style={{ background: `url(${bgPath}) center center/cover no-repeat` }}
      >
        <h1 className={style['search-header']}>Rick and Morty</h1>
        <span className={style['search-subheader']}>characters database</span>
        <SearchForm
          query={this.state.query}
          setQuery={(newQuery: string) => this.setState({ query: newQuery })}
          clickFn={this.handleClick}
        />
        <div className={style['search-results']}>
          <ErrorBoundary>
            <CardList charList={this.state.charList} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default Search;
