import type { UseFormRegister } from 'react-hook-form';
import type { TFormSchema } from '../schema/form-validation.schema';

export interface IPickerProps {
  register: UseFormRegister<TFormSchema>;
  error: string | undefined;
}
