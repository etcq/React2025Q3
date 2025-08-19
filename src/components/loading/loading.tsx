'use client';

import { useTranslations } from 'next-intl';
import { Spinner } from '@ui';
import style from './loading.module.scss';

export function Loading() {
  const f = useTranslations('Loading');
  return (
    <div className={style.loading}>
      <Spinner />
      <p>{`${f('loading')}...`}</p>
    </div>
  );
}
