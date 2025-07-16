import { Component } from 'react';
import sadRickImage from '../../assets/image/sad-rick.png';
import style from './error-message.module.scss';

class ErrorMessage extends Component<{ message?: string }> {
  render() {
    return (
      <div className={style.error}>
        <div className={style['error-content']}>
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
          {this.props.message && (
            <p className={style['error-message']}>{this.props.message}</p>
          )}
        </div>
        <img
          src={sadRickImage}
          alt="sad rick"
          className={style['error-image']}
        />
      </div>
    );
  }
}
export default ErrorMessage;
