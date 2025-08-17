'use client';

import style from './feature-controls.module.scss';
import Button from '../ui/button/button';
import { useTranslations } from 'next-intl';

export default function FeatureControls() {
  const f = useTranslations('Search');
  <div className={style['search-feature']}>
    <Button
      callback={() => {}}
      text={f('error')}
      className={style['error-button']}
      isError={true}
    />
    <Button
      callback={() => {}}
      className={style['search-feature-reset-btn']}
      text={f('refetch')}
    />
  </div>;
}
