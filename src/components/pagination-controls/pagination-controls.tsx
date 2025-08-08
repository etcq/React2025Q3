import { type FC } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import style from './pagination-controls.module.scss';
import Button from '../ui/button/button.tsx';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';

export const PaginationControls: FC = () => {
  const { page, maxPage, prevPage, nextPage } = usePaginationStore(
    (state) => state
  );
  return (
    <div className={style['search-controls']}>
      <Button
        data-testid="prev"
        callback={prevPage}
        className={style['page-button']}
        disabled={page <= 1}
      >
        <GrFormPreviousLink />
      </Button>
      <span
        className={style['search-controls-counter']}
        data-testid="page-counter"
      >
        {page} / {maxPage}
      </span>
      <Button
        data-testid="next"
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
