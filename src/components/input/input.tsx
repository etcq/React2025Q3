import { errorText } from '@/assets/style/classes';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  showName?: string;
  error?: string | string[];
  removeError?: boolean;
};

export function Input({ id, showName, error, ...props }: InputProps) {
  return (
    <div className="flex w-full mx-auto mb-1 flex-col">
      <label htmlFor={id} className="mb-1">
        {showName}
      </label>
      <input
        {...props}
        className="bg-slate-300 rounded text-slate-950"
        id={id}
      />
      {error && <span className={errorText}>{error}</span>}
    </div>
  );
}
