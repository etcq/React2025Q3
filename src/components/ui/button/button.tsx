import type { ButtonHTMLAttributes, FC } from 'react';
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
      className={`${style.button} ${isError && style['error-button']} ${className} `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children ?? props.text}
    </button>
  );
};

export default Button;
