import { Component, type ButtonHTMLAttributes } from 'react';
import style from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  callback: () => void;
  text: string;
}

class Button extends Component<ButtonProps> {
  handleClick = () => {
    this.props.callback();
  };

  render() {
    return (
      <button
        className={this.props.className || style.button}
        onClick={this.handleClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
