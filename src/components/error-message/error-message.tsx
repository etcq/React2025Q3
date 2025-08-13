'use client';

import { useTranslations } from 'next-intl';
import style from './error-message.module.scss';
import Image from 'next/image';

export default function ErrorMessage(props: { message?: string }) {
  const f = useTranslations('Error');
  return (
    <div className={style.error}>
      <div className={style['error-content']}>
        <h1>{f('header')}</h1>
        <p>{f('message')}</p>
        {props.message && (
          <p className={style['error-message']}>
            {f('error')}: {props.message}
          </p>
        )}
      </div>
      <Image
        src="/sad-rick.png"
        alt="sad rick"
        className={style['error-image']}
        width={400}
        height={500}
      />
    </div>
  );
}
