import { type FC, use } from 'react';
import style from './header.module.scss';
import Button from '../ui/button/button';
import { useNavigate } from 'react-router';
import ThemeContext from '../../core/contexts/contexts.ts';

export const Header: FC = () => {
  const navigate = useNavigate();
  const theme = use(ThemeContext);

  return (
    <div className={`${style.header} ${style[theme]}`}>
      <h1 className={style['header-main']}>Rick and Morty</h1>
      <span className={style['header-secondary']}>characters database</span>
      <Button
        callback={() => void navigate('about')}
        className={style['header-about-btn']}
      >
        About Me
      </Button>
    </div>
  );
};
