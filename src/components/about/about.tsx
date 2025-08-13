'use client';

import { type FC } from 'react';
import style from './about.module.scss';
import { FaGithub } from 'react-icons/fa';
import { Link } from '../../i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const AboutMe: FC = () => {
  const f = useTranslations('About');
  return (
    <div className={style['page-wrapper']}>
      <div className={style.about}>
        <h2 className={style['about-header']}>{f('header')}</h2>
        <p className={style['about-content-item']}>{f('hello')}</p>
        <p className={style['about-content-item']}>
          github:
          <a
            className={style['about-github']}
            href="https://github.com/etcq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span>etcq</span>
          </a>
        </p>
        <p className={style['about-content-item']}>
          {f('bio-1')}
          <br />
          {f('bio-2')}
        </p>

        <p className={style['about-content-item']}>{f('invite')}</p>
        <a
          href={'https://rs.school/'}
          className={style['about-logo']}
          data-testid="link"
        >
          <Image src="/logo.svg" alt="Rsschool log" width={150} height={150} />
        </a>
        <Link href="/" className={style['about-back-btn']}>
          {f('back')}
        </Link>
      </div>
    </div>
  );
};
