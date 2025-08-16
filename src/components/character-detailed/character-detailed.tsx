'use client';
import style from './character-detailed.module.scss';
import { RiResetLeftFill } from 'react-icons/ri';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Character } from '../../core/interfaces/interface';
import { useRouter } from '../../i18n/navigation.ts';

export default function CharacterDetailed({ data }: { data: Character }) {
  const f = useTranslations('Detailed');
  const router = useRouter();
  const revalidate = async () => {
    await fetch('/api/revalidate', { method: 'POST' });
    router.refresh();
  };
  return (
    <div className={style.detailed} data-testid="detailed">
      <>
        <Image
          src={data ? data.image : ''}
          alt={`${data?.name} image`}
          className={style['detailed-img']}
          width={120}
          height={120}
        />
        <h3 className={style['detailed-name']} data-testid="detailed-header">
          {data?.name}
        </h3>
        <ul className={style['detailed-info']}>
          <li className={style['detailed-info-item']}>
            {f('status')}:{' '}
            <div
              className={`${style['status-indicator']} ${data?.status === 'Alive' ? style.alive : style.dead}`}
            ></div>
            {data?.status}
          </li>
          <li className={style['detailed-info-item']}>
            {f('species')}: {data?.species}
          </li>
          <li className={style['detailed-info-item']}>
            {f('gender')}: {data?.gender}
          </li>
          <li className={style['detailed-info-item']}>
            {f('location')}: {data?.location?.name}
          </li>
        </ul>
      </>
      <button onClick={revalidate} className={style['detailed-reset-btn']}>
        <RiResetLeftFill />
      </button>
    </div>
  );
}
