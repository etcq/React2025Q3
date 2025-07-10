import React from 'react';
import style from './card-list.module.scss';
import { getAllCharacters } from '../../core/services/api-service';

class CardList extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={style['card-list']}>
        <h1>Marvel Characters</h1>
        <button
          onClick={() => {
            getAllCharacters().then((data) => console.log(data));
          }}
        >
          Fetch
        </button>
        <p>Check the console for the fetched data.</p>
      </div>
    );
  }
}

export default CardList;
