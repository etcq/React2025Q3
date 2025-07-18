import { Component } from 'react';
import style from './search.module.scss';
import SearchForm from '../../components/search-form/search-form';
import CardList from '../../components/card-list/card-list';
import type { Character } from '../../core/interfaces/interface.ts';
import ErrorBoundary from '../../components/error-boundary/error-boundary';
import { getCharacters } from '../../core/services/api-service.ts';
import bgPath from '../../assets/image/rick-and-morty-bg.jpg';
import Loading from '../../components/loading/loading.tsx';
import Button from '../../components/ui/button/button.tsx';

interface ISearchState {
  charList: Character[] | undefined;
  query: string;
  loading: boolean;
}

class Search extends Component {
  state: ISearchState = {
    query: '',
    charList: undefined,
    loading: false,
  };

  componentDidMount(): void {
    this.setState((prevState) => ({
      ...prevState,
      query: localStorage.getItem('search-query'),
    }));
    this.handleClick();
  }

  handleClick = (query = this.state.query): void => {
    this.setState({ loading: true });
    getCharacters(query)
      .then((newCharList) => {
        this.setState({ charList: newCharList });
      })
      .catch(() => {
        this.setState({ charList: [] });
      })
      .finally(() => this.setState({ loading: false }));
  };

  setQuery = (query: string): void => {
    this.setState({ query });
    localStorage.setItem('search-query', query);
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
          setQuery={this.setQuery}
          clickFn={this.handleClick}
        />
        <div className={style['search-results']}>
          {this.state.loading ? (
            <Loading />
          ) : (
            <ErrorBoundary>
              <CardList charList={this.state.charList} />
            </ErrorBoundary>
          )}
        </div>
        <Button
          callback={() => this.handleClick('qwe213')}
          text="Error"
          className={style['error-button']}
        />
      </div>
    );
  }
}

export default Search;
