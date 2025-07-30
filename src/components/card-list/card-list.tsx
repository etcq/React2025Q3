import { type FC, use, useEffect } from 'react';
import style from './card-list.module.scss';
import Card from './card/card.tsx';
import type { Character } from '../../core/interfaces/interface.ts';
import ThemeContext from '../../core/contexts/contexts.ts';

const CardList: FC<{
  charList: Character[];
}> = ({ charList }) => {
  const theme = use(ThemeContext);
  useEffect(() => {
    if (Array.isArray(charList) && charList.length === 0) {
      throw new Error('No characters to display');
    }
  }, [charList]);

  return (
    <div className={`${style['card-list']} ${style[theme]}`}>
      {charList.map((char) => (
        <Card data={char} key={String(char.id)} />
      ))}
    </div>
  );
};

export default CardList;
