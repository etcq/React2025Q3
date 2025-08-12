import { type FC } from 'react';
import styles from './not-found.module.scss';
import Button from '../ui/button/button.tsx';
import { useNavigate } from 'react-router';
import imgPath from '/not-found.png';
import Image from 'next/image';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['page-wrapper']}>
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
        <Image
          src={imgPath}
          className={styles['not-found_img']}
          alt="Not found"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};
