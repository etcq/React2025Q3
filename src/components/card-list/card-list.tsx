import style from './card-list.module.scss';
import Card from './card/card.tsx';
import type { Character } from '../../core/interfaces/interface.ts';

interface ICardListProps {
  charList: Character[] | undefined;
}

export default function CardList({ charList }: ICardListProps) {
  return (
    <div className={style['card-list']}>
      {charList &&
        charList.map((char) => <Card data={char} key={String(char.id)} />)}
    </div>
  );
}
