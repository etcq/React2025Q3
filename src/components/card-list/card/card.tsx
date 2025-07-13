import { Component } from 'react';
import type { Character } from '../../../core/interfaces/interface.ts';
import styles from './card.module.scss';

class Card extends Component<{ data: Character }> {
  render() {
    const { name, image, status, gender, species } = this.props.data;
    return (
      <div className={styles.card}>
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
  }
}

export default Card;
