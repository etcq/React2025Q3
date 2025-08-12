import type { FC } from 'react';
import errorImg from '/not-found.png';
import style from './detailed-error.module.scss';
import Image from 'next/image';

export const DetailedError: FC = () => {
  return (
    <div className={style['detailed-error']}>
      <h2>Oops</h2>
      <h3>Character not found</h3>
      <Image
        className={style['detailed-error-img']}
        src={errorImg}
        alt="error"
        width={400}
        height={500}
      />
    </div>
  );
};
