import { type ButtonHTMLAttributes, type FC } from 'react';
import style from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  callback: () => void;
  text?: string;
  disabled?: boolean;
  isError?: boolean;
}

const Button: FC<ButtonProps> = ({
  callback,
  className,
  disabled,
  children,
  isError,
  ...props
}) => {
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
};

export default Button;
