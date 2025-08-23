import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import type { TFormSchema } from '../schema/form-validation.schema';

export interface IPickerProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  error?: string | undefined;
  errors?:
    | FieldErrors<TFormSchema>
    | Record<string, { message: string[] | string }>;
  name?: string;
}
