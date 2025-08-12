import { type FC } from 'react';
import style from './character-detailed.module.scss';
import { useNavigate, useParams } from 'react-router';
import Loading from '../loading/loading';
import Button from '../ui/button/button';
import { MdClose } from 'react-icons/md';
import { DetailedError } from './detailed-error/detailed-error';
import { useQueryDetailedCharacter } from '../../core/hooks/query-hooks/use-query-detailed-character';
import { RiResetLeftFill } from 'react-icons/ri';
import Image from 'next/image';

export const CharacterDetailed: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
            width={300}
            height={300}
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
      <Button
        className={style['detailed-back-btn']}
        callback={() => void navigate('/')}
        data-testid="detailed-back-btn"
      >
        <MdClose />
      </Button>
      <Button callback={resetData} className={style['detailed-reset-btn']}>
        <RiResetLeftFill />
      </Button>
    </div>
  );
};
