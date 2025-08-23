import { errorText } from '@/assets/style/classes';
import type { IPickerProps } from '@/core/interfaces';
import type { TControlledForm } from '@/core/schema/form-validation.schema';
import { useCountryStore } from '@/core/stores/country-store';

export function CountryPicker({
  register,
  errors,
}: IPickerProps<TControlledForm>) {
  const countries = useCountryStore((state) => state.countries);
  return (
    <div className="relative">
      <label className="mb-5" htmlFor="country">
        Select your country
      </label>
      <select
        id="country"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block
        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-slate-500"
        {...(register ? register('country') : { name: 'country' })}
        defaultValue={''}
      >
        <option value="-">-</option>
        {countries.map((country) => {
          return (
            <option value={country} key={country}>
              {country}
            </option>
          );
        })}
      </select>
      {errors?.country?.message && (
        <span className={`${errorText} text-center`}>
          {errors.country.message}
        </span>
      )}
    </div>
  );
}
