import type { FC } from 'react';
import style from './about.module.scss';
import logoImg from '../../assets/image/logo.svg';

export const AboutMe: FC = () => {
  return (
    <div className={style['page-wrapper']}>
      <div className={style.about}>
        <h2 className={style['about-header']}>About Me</h2>
        <p>Hello my name is Anton</p>
        <p>github</p>
        <p>
          bio: I live in Yekaterinburg, Russia, and currently work in the
          electric power industry. While I was a student, I became interested in
          programming, but it was only recently that I decided to take it
          seriously. What I love about programming is the endless learning
          process - there is always something new to learn, interesting
          challenges, and the feeling of accomplishment when you finally solve a
          problem after putting in a lot of effort.\n In 2024, I enrolled in RS
          School (Stage 0) to create a structured path for my web development
          skills. My goals are to master React (with all its supporting
          libraries) and to become proficient in Full Stack development using
          Node.js and databases.
        </p>
        <p>Thanks my loved school:</p>
        <a href={'https://rs.school/'}>
          <img src={logoImg} alt="Rsschool log" />
        </a>
      </div>
    </div>
  );
};
