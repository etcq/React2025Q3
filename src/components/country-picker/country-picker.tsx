import { errorText } from '@/assets/style/classes';
import type { IPickerProps } from '@/core/interfaces';
import { useCountryStore } from '@/core/stores/country-store';

export function CountryPicker({ register, error }: IPickerProps) {
  const countries = useCountryStore((state) => state.countries);
  return (
    <div>
      <select className="my-5" {...register('country')} defaultValue={''}>
        <option value="-">-</option>
        {countries.map((country) => {
          return (
            <option value={country} key={country}>
              {country}
            </option>
          );
        })}
      </select>
      {error && <span className={`${errorText} text-center`}>{error}</span>}
    </div>
  );
}
