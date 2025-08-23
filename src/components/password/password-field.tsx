import { errorText } from '@/assets/style/classes';
import type { IPickerProps } from '@/core/interfaces';
import type { TControlledForm } from '@/core/schema/form-validation.schema';
import { Input } from '@components';

export function PasswordField({
  register,
  errors,
}: IPickerProps<TControlledForm>) {
  return (
    <div>
      <label htmlFor="passwordField">Password</label>
      <fieldset
        className="flex flex-col gap-3 border-2 border-slate-300 p-3 rounded relative"
        id="passwordField"
      >
        <div className="flex flex-row gap-3">
          <Input
            type="password"
            {...(register ? register('password') : { name: 'password' })}
          />
          <Input
            type="password"
            {...(register ? register('confirmed') : { name: 'confirmed' })}
          />
        </div>
        {errors && (
          <span className={`${errorText} text-center`}>
            {errors?.password?.message || errors?.confirmed?.message}
          </span>
        )}
      </fieldset>
    </div>
  );
}
