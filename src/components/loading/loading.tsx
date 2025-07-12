import { Component } from 'react';
import Spinner from '../spinner/spinner.tsx';
import style from './loading.module.scss';

class Loading extends Component {
  render() {
    return (
      <div className={style.loading}>
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }
}
export default Loading;
