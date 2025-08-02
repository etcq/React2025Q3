import type { FC } from 'react';
import style from './theme-switcher.module.scss';

export const ThemeSwitcher: FC<{
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}> = ({ theme, toggleTheme }) => {
  return (
    <button
      className={`${style['theme-switcher-grid']} ${style[theme]}`}
      id="theme-switcher-grid"
      aria-label="Switch theme"
      data-testid="theme-switcher"
      onClick={toggleTheme}
    >
      <div className={style.sun} aria-hidden="true"></div>
      <div
        className={style['moon-overlay']}
        id="moon-overlay"
        aria-hidden="true"
      ></div>
      <div
        className={`${style['cloud-ball']} ${style.ball1}`}
        aria-hidden="true"
      ></div>
      <div
        className={`${style['cloud-ball']} ${style.ball2}`}
        aria-hidden="true"
      ></div>
      <div
        className={`${style['cloud-ball']} ${style.ball3}`}
        aria-hidden="true"
      ></div>
      <div
        className={`${style['cloud-ball']} ${style.ball4}`}
        aria-hidden="true"
      ></div>
      <div className={`${style.star} ${style.star1}`} aria-hidden="true"></div>
      <div className={`${style.star} ${style.star2}`} aria-hidden="true"></div>
      <div className={`${style.star} ${style.star3}`} aria-hidden="true"></div>
      <div className={`${style.star} ${style.star4}`} aria-hidden="true"></div>
    </button>
  );
};
