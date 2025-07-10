import React from 'react';
import style from './card-list.module.scss';
import Card from './card/card.tsx';
import type { Character } from '../../core/interfaces/interface.ts';

class CardList extends React.Component<{ charList: Character[] }> {
  render(): React.ReactNode {
    return (
      <div className={style['card-list']}>
        {this.props.charList.map((char) => (
          <Card data={char} key={String(char.id)} />
        ))}
      </div>
    );
  }
}

export default CardList;
