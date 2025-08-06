import { type FC, useRef, type ChangeEvent } from 'react';
import type { Character } from '../../../core/interfaces/interface.ts';
import styles from './card.module.scss';
import { useNavigate } from 'react-router';
import { useSelectCharactersStore } from '../../../core/stores/select-characters-store.ts';

const Card: FC<{ data: Character }> = ({ data }) => {
  const { id, name, image, status, gender, species } = data;
  const navigate = useNavigate();
  const { characters, selectCharacters, unselectCharacter } =
    useSelectCharactersStore((state) => state);

  const checkbox = useRef(null);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selectCharacters(data);
    } else {
      unselectCharacter(id);
    }
  };

  return (
    <div
      className={styles.card}
      data-testid="card"
      onClick={(event) => {
        if (event.target !== checkbox.current) {
          navigate(`/detailed/${id}`);
        }
      }}
    >
      <img className={styles['card-avatar']} src={image} alt={name} />
      <div className={styles['card-info']}>
        <div className={styles['card-main_info']}>
          <span>{name}</span>
          <span className={status === 'Alive' ? styles.alive : styles.dead}>
            {status}
          </span>
        </div>
        <div className={styles['card-secondary_info']}>
          <span>{species}</span>
          <span>{gender}</span>
        </div>
      </div>
      <input
        className={styles['card-checkbox']}
        type="checkbox"
        ref={checkbox}
        onChange={handleCheckboxChange}
        checked={characters.some((character) => character.id === id)}
      />
    </div>
  );
};

export default Card;
