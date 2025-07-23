import type { ButtonHTMLAttributes, FC } from 'react';
import style from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  callback: () => void;
  text: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const handleClick = () => {
    props.callback();
  };
  return (
    <button
      className={props.className || style.button}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
