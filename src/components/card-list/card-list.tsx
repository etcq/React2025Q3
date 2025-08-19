import style from './card-list.module.scss';
import { Card } from '@components';
import type { Character } from '@interfaces';

interface ICardListProps {
  charList: Character[] | undefined;
}

export function CardList({ charList }: ICardListProps) {
  return (
    <div className={style['card-list']}>
      {charList &&
        charList.map((char) => <Card data={char} key={String(char.id)} />)}
    </div>
  );
}
