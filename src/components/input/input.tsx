import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
  removeError?: boolean;
};

export function Input({ ...props }: InputProps) {
  const { id, name, type, error, removeError } = props;
  return (
    <div className="flex w-full mx-auto mb-1 flex-col">
      <label htmlFor={id}>{name}</label>
      <input
        name={name}
        type={type}
        id={id}
        placeholder={name}
        className="bg-slate-300 ms-3 rounded w-3/4 text-slate-950"
        autoComplete="on"
      />
      {!removeError && <span>{error}</span>}
    </div>
  );
}
