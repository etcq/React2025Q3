import { useEffect, useState, type FC } from 'react';
import style from './character-detailed.module.scss';
import { useNavigate, useParams } from 'react-router';
import { getCharacter } from '../../core/services/api-service';
import { type Character } from '../../core/interfaces/interface';
import Loading from '../loading/loading';
import Button from '../ui/button/button';
import { MdClose } from 'react-icons/md';

export const CharacterDetailed: FC = () => {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getCharacter(+id)
        .then((data) => setCharacter(data))
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <div className={style.detailed}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <img
            src={character?.image}
            alt={`${character?.name} image`}
            className={style['detailed-img']}
          />
          <h3 className={style['detailed-name']}>{character?.name}</h3>
          <ul className={style['detailed-info']}>
            <li className={style['detailed-info-item']}>
              Status:{' '}
              <div
                className={`${style['status-indicator']} ${character?.status === 'Alive' ? style.alive : style.dead}`}
              ></div>
              {character?.status}
            </li>
            <li className={style['detailed-info-item']}>
              Species: {character?.species}
            </li>
            <li className={style['detailed-info-item']}>
              Gender: {character?.gender}
            </li>
            <li className={style['detailed-info-item']}>
              Last location: {character?.location?.name}
            </li>
          </ul>

          <Button
            className={style['detailed-back-btn']}
            callback={() => void navigate('/')}
          >
            <MdClose />
          </Button>
        </>
      )}
    </div>
  );
};
