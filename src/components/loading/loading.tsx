import { Spinner } from '../ui/spinner/spinner';
import style from './loading.module.scss';

export default function Loading() {
  return (
    <div className={style.loading}>
      <Spinner />
      <p>loading</p>
    </div>
  );
}
