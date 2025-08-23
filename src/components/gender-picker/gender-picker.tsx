import { errorText, radioButton } from '@/assets/style/classes';
import type { TControlledForm } from '@/core/schema/form-validation.schema';
import type { IPickerProps } from '@interfaces';

export function GenderPicker({
  register,
  errors,
}: IPickerProps<TControlledForm>) {
  return (
    <div>
      <label htmlFor="genderField">Select your gender</label>
      <fieldset
        className="flex flex-col border-1 border-slate-200 p-2 rounded"
        id="genderField"
      >
        <div className="flex justify-center gap-12">
          <div>
            <input
              type="radio"
              id="man"
              value="man"
              className={radioButton}
              {...(register ? register('gender') : { name: 'gender' })}
            />
            <label htmlFor="man">Man</label>
          </div>
          <div>
            <input
              type="radio"
              id="woman"
              value="woman"
              className={radioButton}
              {...(register ? register('gender') : { name: 'gender' })}
            />
            <label htmlFor="woman">Woman</label>
          </div>
        </div>
        {errors?.gender?.message && (
          <span className={`${errorText} text-center`}>
            {errors.gender.message}
          </span>
        )}
      </fieldset>
    </div>
  );
}
