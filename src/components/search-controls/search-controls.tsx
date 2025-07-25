import type { FC } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import style from './search-controls.module.scss';
import Button from '../ui/button/button';

interface IControls {
  page: number;
  maxPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

export const SearchControls: FC<IControls> = ({
  page,
  maxPage,
  prevPage,
  nextPage,
}) => {
  return (
    <div className={style['search-controls']}>
      <Button
        callback={prevPage}
        className={style['page-button']}
        disabled={page <= 1}
      >
        <GrFormPreviousLink />
      </Button>
      <span className={style['search-controls-counter']}>
        {page} / {maxPage}
      </span>
      <Button
        callback={nextPage}
        text="Next Page"
        className={style['page-button']}
        disabled={page >= maxPage}
      >
        <GrFormNextLink />
      </Button>
    </div>
  );
};
