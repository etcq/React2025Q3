import { type FC } from 'react';
import style from './character-detailed.module.scss';
import { useNavigate, useParams } from 'react-router';
import { getCharacter } from '../../core/services/api-service';
import Loading from '../loading/loading';
import Button from '../ui/button/button';
import { MdClose } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { DetailedError } from './detailed-error/detailed-error';

export const CharacterDetailed: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ['character-detailed', id],
    queryFn: () => getCharacter(id),
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

  return (
    <div className={style.detailed} data-testid="detailed">
      {isPending ? (
        <Loading />
      ) : isError ? (
        <DetailedError />
      ) : (
        <>
          <img
            src={data?.image}
            alt={`${data?.name} image`}
            className={style['detailed-img']}
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
    </div>
  );
};
