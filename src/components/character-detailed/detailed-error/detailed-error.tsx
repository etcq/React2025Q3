import { useTranslations } from 'next-intl';
import style from './detailed-error.module.scss';
import Image from 'next/image';

export function DetailedError() {
  const f = useTranslations('DetailedError');
  return (
    <div className={style['detailed-error']}>
      <h2>{f('oops')}</h2>
      <h3>{f('not-found')}</h3>
      <Image
        className={style['detailed-error-img']}
        src="/not-found.png"
        alt="error"
        width={180}
        height={180}
      />
    </div>
  );
}
