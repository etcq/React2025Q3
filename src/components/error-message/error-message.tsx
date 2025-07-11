import { Component } from 'react';
import sadRickImage from '../../assets/image/sad-rick.png';
import style from './error-message.module.scss';

class ErrorMessage extends Component {
  render() {
    return (
      <div className={style['error-message']}>
        <div className={style['error-content']}>
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
        </div>
        <img src={sadRickImage} alt="sad rick" />
      </div>
    );
  }
}
export default ErrorMessage;
