import { type FC, use } from 'react';
import Spinner from '../ui/spinner/spinner.tsx';
import style from './loading.module.scss';
import ThemeContext from '../../core/contexts/contexts.ts';

const Loading: FC = () => {
  const { theme } = use(ThemeContext);
  return (
    <div className={`${style.loading} ${style[theme]}`}>
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};
export default Loading;
