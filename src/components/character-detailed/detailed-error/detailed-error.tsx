import type { FC } from 'react';
import style from './detailed-error.module.scss';
import Image from 'next/image';

export const DetailedError: FC = () => {
  return (
    <div className={style['detailed-error']}>
      <h2>Oops</h2>
      <h3>Character not found</h3>
      <Image
        className={style['detailed-error-img']}
        src="/not-found.png"
        alt="error"
        width={180}
        height={180}
      />
    </div>
  );
};
