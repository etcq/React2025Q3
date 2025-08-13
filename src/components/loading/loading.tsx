import { useTranslations } from 'next-intl';
import Spinner from '../ui/spinner/spinner.tsx';
import style from './loading.module.scss';

export default function Loading() {
  const f = useTranslations('Loading');
  return (
    <div className={style.loading}>
      <Spinner />
      <p>{`${f('loading')}...`}</p>
    </div>
  );
}
