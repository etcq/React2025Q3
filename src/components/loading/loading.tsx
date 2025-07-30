import type { FC } from 'react';
import Spinner from '../ui/spinner/spinner.tsx';
import style from './loading.module.scss';

const Loading: FC = () => {
  return (
    <div className={style.loading}>
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};
export default Loading;
