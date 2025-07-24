import { type FC, useEffect } from 'react';
import style from './card-list.module.scss';
import Card from './card/card.tsx';
import type { Character } from '../../core/interfaces/interface.ts';

const CardList: FC<{
  charList: Character[];
  // setCharacter: (id: number) => void;
}> = ({ charList }) => {
  useEffect(() => {
    if (Array.isArray(charList) && charList.length === 0) {
      throw new Error('No characters to display');
    }
  }, [charList]);

  return (
    <div className={style['card-list']}>
      {charList ? (
        charList.map((char) => <Card data={char} key={String(char.id)} />)
      ) : (
        <div className={style['card-list-fallback']}>
          <h3>Enter your query and click the search button</h3>
        </div>
      )}
    </div>
  );
};

export default CardList;
