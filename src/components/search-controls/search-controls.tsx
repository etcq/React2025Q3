import { type FC, use } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import style from './search-controls.module.scss';
import Button from '../ui/button/button';
import ThemeContext from '../../core/contexts/contexts.ts';

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
  const theme = use(ThemeContext);
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
