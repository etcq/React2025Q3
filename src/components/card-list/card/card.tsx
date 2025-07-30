import { type FC, use } from 'react';
import type { Character } from '../../../core/interfaces/interface.ts';
import styles from './card.module.scss';
import { useNavigate } from 'react-router';
import ThemeContext from '../../../core/contexts/contexts.ts';

const Card: FC<{ data: Character }> = ({ data }) => {
  const { id, name, image, status, gender, species } = data;
  const theme = use(ThemeContext);
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.card} ${styles[theme]}`}
      data-testid="card"
      onClick={() => void navigate(`/detailed/${id}`)}
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
