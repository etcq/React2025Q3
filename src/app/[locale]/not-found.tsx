import Link from 'next/link';
import style from './not-found.module.scss';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className={style['page-wrapper']}>
      <div className={style['not-found']}>
        <div className={style['not-found_description']}>
          <h2 className={style.title}>Error 404</h2>
          <h2 className={style.title}>Page is not found</h2>
          <p>We can&#39;t find the page you were looking for.</p>
          <Link href="/" className={style['not-found-btn']}>
            Back to main
          </Link>
        </div>
        <Image
          src="/not-found.png"
          className={style['not-found_img']}
          alt="Not found"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
