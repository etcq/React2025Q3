import { errorText, radioButton } from '@/assets/style/classes';
import type { IPickerProps } from '@interfaces';

export function GenderPicker({ register, error }: IPickerProps) {
  return (
    <div className="flex flex-col border-1 border-slate-200 p-2 rounded">
      <div className="flex justify-center gap-12">
        <div>
          <input
            type="radio"
            id="man"
            value="man"
            className={radioButton}
            {...register('gender')}
          />
          <label htmlFor="man">Man</label>
        </div>
        <div>
          <input
            type="radio"
            id="woman"
            value="woman"
            className={radioButton}
            {...register('gender')}
          />
          <label htmlFor="woman">Woman</label>
        </div>
      </div>
      {error && <span className={`${errorText} text-center`}>{error}</span>}
    </div>
  );
}
