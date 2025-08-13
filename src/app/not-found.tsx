import Link from 'next/link';
import style from './not-found.module.scss';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700'],
  fallback: ['arial'],
  variable: '--font-montserrat',
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export default function NotFound() {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
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
      </body>
    </html>
  );
}
