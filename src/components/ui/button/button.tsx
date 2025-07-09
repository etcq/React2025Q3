import React from 'react';
import style from './button.module.scss';

type ButtonProps = {
  callback: () => void;
};

class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.callback();
  };

  render(): React.ReactNode {
    return (
      <button className={style.button} onClick={this.handleClick}>
        Search
      </button>
    );
  }
}

export default Button;
