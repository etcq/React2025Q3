'use client';

import { type FC } from 'react';
import style from './character-detailed.module.scss';
import Loading from '../loading/loading';
import { MdClose } from 'react-icons/md';
import { DetailedError } from './detailed-error/detailed-error';
import { useQueryDetailedCharacter } from '../../core/hooks/query-hooks/use-query-detailed-character';
import { RiResetLeftFill } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';

export const CharacterDetailed: FC<{ id: string }> = ({ id }) => {
  const { data, isPending, isFetching, isError, resetData } =
    useQueryDetailedCharacter(id);

  return (
    <div className={style.detailed} data-testid="detailed">
      {isPending || isFetching ? (
        <Loading />
      ) : isError ? (
        <DetailedError />
      ) : (
        <>
          <Image
            src={data ? data.image : ''}
            alt={`${data?.name} image`}
            className={style['detailed-img']}
            width={100}
            height={120}
          />
          <h3 className={style['detailed-name']} data-testid="detailed-header">
            {data?.name}
          </h3>
          <ul className={style['detailed-info']}>
            <li className={style['detailed-info-item']}>
              Status:{' '}
              <div
                className={`${style['status-indicator']} ${data?.status === 'Alive' ? style.alive : style.dead}`}
              ></div>
              {data?.status}
            </li>
            <li className={style['detailed-info-item']}>
              Species: {data?.species}
            </li>
            <li className={style['detailed-info-item']}>
              Gender: {data?.gender}
            </li>
            <li className={style['detailed-info-item']}>
              Last location: {data?.location?.name}
            </li>
          </ul>
        </>
      )}
      <Link
        className={style['detailed-back-btn']}
        href="/"
        data-testid="detailed-back-btn"
      >
        <MdClose />
      </Link>
      <button onClick={resetData} className={style['detailed-reset-btn']}>
        <RiResetLeftFill />
      </button>
    </div>
  );
};
