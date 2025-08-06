import type { FC } from 'react';
import errorImg from '../../../assets/image/not-found.png';
import style from './detailed-error.module.scss';

export const DetailedError: FC = () => {
  return (
    <div className={style['detailed-error']}>
      <h2>Oops</h2>
      <h3>Character not found</h3>
      <img className={style['detailed-error-img']} src={errorImg} alt="error" />
    </div>
  );
};
