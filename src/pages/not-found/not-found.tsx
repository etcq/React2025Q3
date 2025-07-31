import { use, type FC } from 'react';
import styles from './not-found.module.scss';
import Button from '../../components/ui/button/button.tsx';
import { useNavigate } from 'react-router';
import imgPath from '../../assets/image/not-found.png';
import ThemeContext from '../../core/contexts/contexts.ts';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const { theme } = use(ThemeContext);
  return (
    <div className={`${styles['page-wrapper']} ${styles[theme]}`}>
      <div className={styles['not-found']}>
        <div className={styles['not-found_description']}>
          <h2 className={styles.title}>Error 404</h2>
          <h2 className={styles.title}>Page is not found</h2>
          <p>We can&#39;t find the page you were looking for.</p>
          <Button
            type="button"
            callback={() => {
              void navigate('/');
            }}
          >
            Back to main
          </Button>
        </div>
        <img
          src={imgPath}
          className={styles['not-found_img']}
          alt="Not found"
        />
      </div>
    </div>
  );
};
