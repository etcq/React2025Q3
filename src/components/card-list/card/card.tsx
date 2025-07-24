import type { FC } from 'react';
import type { Character } from '../../../core/interfaces/interface.ts';
import styles from './card.module.scss';

const Card: FC<{ data: Character; setCharacter: (id: number) => void }> = ({
  data,
  setCharacter,
}) => {
  const { id, name, image, status, gender, species } = data;
  return (
    <div
      className={styles.card}
      data-testid="card"
      onClick={() => setCharacter(id)}
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
    </div>
  );
};

export default Card;
