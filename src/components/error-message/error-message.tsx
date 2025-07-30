import sadRickImage from '../../assets/image/sad-rick.png';
import style from './error-message.module.scss';
import { use } from 'react';
import ThemeContext from '../../core/contexts/contexts.ts';

const ErrorMessage = (props: { message?: string }) => {
  const theme = use(ThemeContext);
  return (
    <div className={style.error}>
      <div className={`${style['error-content']} ${style[theme]}`}>
        <h1>Something went wrong</h1>
        <p>Please try again later.</p>
        {props.message && (
          <p className={style['error-message']}>{props.message}</p>
        )}
      </div>
      <img src={sadRickImage} alt="sad rick" className={style['error-image']} />
    </div>
  );
};
export default ErrorMessage;
