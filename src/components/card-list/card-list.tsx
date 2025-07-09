import React from 'react';
import style from './card-list.module.scss';

class CardList extends React.Component {
  render(): React.ReactNode {
    return <div className={style['card-list']}></div>;
  }
}

export default CardList;
