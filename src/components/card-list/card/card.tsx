import { type FC, use, useRef } from 'react';
import type { Character } from '../../../core/interfaces/interface.ts';
import styles from './card.module.scss';
import { useNavigate } from 'react-router';
import ThemeContext from '../../../core/contexts/contexts.ts';
import { useCharactersStore } from '../../../core/stores/stores.ts';

const Card: FC<{ data: Character }> = ({ data }) => {
  const { id, name, image, status, gender, species } = data;
  const characters = useCharactersStore((state) => state.characters);
  const selectCharacters = useCharactersStore(
    (state) => state.selectCharacters
  );
  const unselectCharacter = useCharactersStore(
    (state) => state.unselectCharacter
  );
  const { theme } = use(ThemeContext);
  const checkbox = useRef(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selectCharacters(data);
    } else {
      unselectCharacter(id);
    }
  };

  return (
    <div
      className={`${styles.card} ${styles[theme]}`}
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
        type="checkbox"
        ref={checkbox}
        onChange={(event) => {
          handleCheckboxChange(event);
          console.log(characters, 'characters in card.tsx');
        }}
        checked={characters.some((character) => character.id === id)}
      />
    </div>
  );
};

export default Card;
