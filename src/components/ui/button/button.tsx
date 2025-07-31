import { type ButtonHTMLAttributes, type FC, use } from 'react';
import style from './button.module.scss';
import ThemeContext from '../../../core/contexts/contexts.ts';

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
  const { theme } = use(ThemeContext);
  const handleClick = () => {
    callback();
  };
  return (
    <button
      {...props}
      className={`${style[`${theme}-btn`]} ${isError ? style['error-button'] : style.button} ${className} `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children ?? props.text}
    </button>
  );
};

export default Button;
