import React from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface.ts';
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
        <h1>Rick and Morty chars</h1>
        <SearchForm
          query={this.state.query}
          setQuery={(newQuery: string) => this.setState({ query: newQuery })}
          clickFn={this.handleClick}
        />
        <CardList charList={this.state.charList} />
      </div>
    );
  }
}

export default Search;
