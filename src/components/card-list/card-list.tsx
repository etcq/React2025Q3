'use client';
import style from './card-list.module.scss';
import Card from './card/card.tsx';
import type { ICharacterResponse } from '../../core/interfaces/interface.ts';
import { useEffect } from 'react';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';

interface ICardListProps {
  data: ICharacterResponse;
}

export default function CardList({ data }: ICardListProps) {
  const { setMaxPage } = usePaginationStore((state) => state);
  useEffect(() => {
    if (data) {
      setMaxPage(data.maxPage);
    }
  }, [setMaxPage, data]);

  return (
    <>
      <div className={style['card-list']}>
        {data.characters &&
          data.characters.map((char) => (
            <Card data={char} key={String(char.id)} />
          ))}
      </div>
    </>
  );
}
