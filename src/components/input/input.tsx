import { errorText } from '@/assets/style/classes';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
  removeError?: boolean;
};

export function Input({ ...props }: InputProps) {
  const { id, name, error, removeError } = props;
  return (
    <div className="flex w-full mx-auto mb-1 flex-col">
      <label htmlFor={id}>{name}</label>
      <input
        {...props}
        className="bg-slate-300 ms-3 rounded w-3/4 text-slate-950"
      />
      {!removeError && <span className={errorText}>{error}</span>}
    </div>
  );
}
