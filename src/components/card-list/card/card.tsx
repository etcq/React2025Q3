import { type FC, useRef, type ChangeEvent, type MouseEvent } from 'react';
import type { Character } from '../../../core/interfaces/interface.ts';
import styles from './card.module.scss';
import { useSelectCharactersStore } from '../../../core/stores/select-characters-store.ts';
import Image from 'next/image';
import { useRouter } from '../../../i18n/navigation.ts';

const Card: FC<{ data: Character }> = ({ data }) => {
  const router = useRouter();
  const { id, name, image, status, gender, species } = data;
  const { characters, selectCharacters, unselectCharacter } =
    useSelectCharactersStore((state) => state);
  const checkbox = useRef(null);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selectCharacters(id);
    } else {
      unselectCharacter(id);
    }
  };

  const openCharacterDetailed = (event: MouseEvent) => {
    if (event.target !== checkbox.current) {
      router.push(`/detailed/${id}`);
    }
  };

  return (
    <div
      className={styles.card}
      data-testid="card"
      onClick={openCharacterDetailed}
    >
      <Image
        className={styles['card-avatar']}
        src={image}
        alt={name}
        width={200}
        height={200}
      />
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
        checked={characters.some((character) => character === id)}
      />
    </div>
  );
};

export default Card;
