import { type FC, use } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import style from './search-controls.module.scss';
import Button from '../ui/button/button';
import ThemeContext from '../../core/contexts/contexts.ts';
import { usePaginationStore } from '../../core/stores/pagination-store.ts';

export const SearchControls: FC = () => {
  const { theme } = use(ThemeContext);
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
        className={`${style['search-controls-counter']} ${style[theme]}`}
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
