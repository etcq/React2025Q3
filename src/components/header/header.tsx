import type { FC } from 'react';
import style from './header.module.scss';
import Button from '../ui/button/button';
import { useNavigate } from 'react-router';

export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
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
