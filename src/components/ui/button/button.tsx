import { type ButtonHTMLAttributes } from 'react';
import style from './button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  callback: () => void;
  text?: string;
  disabled?: boolean;
  isError?: boolean;
}

export function Button({
  callback,
  className,
  disabled,
  children,
  isError,
  ...props
}: IButtonProps) {
  const handleClick = () => {
    callback();
  };
  return (
    <button
      {...props}
      className={`${isError ? style['error-button'] : style.button} ${className} `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children ?? props.text}
    </button>
  );
}
