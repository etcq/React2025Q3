import type { JSX } from 'react';
import Spinner from '../ui/spinner/spinner.tsx';
import style from './loading.module.scss';

const Loading = (): JSX.Element => {
  return (
    <div className={style.loading}>
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};
export default Loading;
