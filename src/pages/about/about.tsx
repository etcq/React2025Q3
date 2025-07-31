import { type FC, use } from 'react';
import style from './about.module.scss';
import logoImg from '../../assets/image/logo.svg';
import { FaGithub } from 'react-icons/fa';
import Button from '../../components/ui/button/button';
import { useNavigate } from 'react-router';
import ThemeContext from '../../core/contexts/contexts';

export const AboutMe: FC = () => {
  const navigate = useNavigate();
  const { theme } = use(ThemeContext);
  return (
    <div className={`${style['page-wrapper']} ${style[theme]}`}>
      <div className={style.about}>
        <h2 className={style['about-header']}>About Me</h2>
        <p className={style['about-content-item']}>Hello my name is Anton</p>
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
          I live in Yekaterinburg, Russia, and currently work in the electric
          electric power industry. While I was a student, I became interested in
          programming, but it was only recently that I decided to take it
          seriously. What I love about programming is the endless learning
          process - there is always something new to learn, interesting
          challenges, and the feeling of accomplishment when you finally solve a
          problem after putting in a lot of effort.
          <br />
          In 2024, I enrolled in RS School (Stage 0) to create a structured path
          for my web development skills. My goals are to master React (with all
          its supporting libraries) and to become proficient in Full Stack
          development using Node.js and databases.
        </p>

        <p className={style['about-content-item']}>
          Join the best programming school
        </p>
        <a
          href={'https://rs.school/'}
          className={style['about-logo']}
          data-testid="link"
        >
          <img src={logoImg} alt="Rsschool log" />
        </a>
        <Button
          className={style['about-back-btn']}
          type="button"
          callback={() => {
            void navigate('/');
          }}
        >
          Back to main
        </Button>
      </div>
    </div>
  );
};
