import { Component } from 'react';
import style from './card-list.module.scss';
import Card from './card/card.tsx';
import type { Character } from '../../core/interfaces/interface.ts';

class CardList extends Component<{ charList: Character[] | undefined }> {
  componentDidMount(): void {
    if (
      Array.isArray(this.props.charList) &&
      this.props.charList.length === 0
    ) {
      throw new Error('No characters to display');
    }
  }

  render() {
    return (
      <div className={style['card-list']}>
        {this.props.charList ? (
          this.props.charList.length !== 0 &&
          this.props.charList.map((char) => (
            <Card data={char} key={String(char.id)} />
          ))
        ) : (
          <div className={style['card-list-fallback']}>
            <h3>Enter your query and click the search button</h3>
          </div>
        )}
      </div>
    );
  }
}

export default CardList;
