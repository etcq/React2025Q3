import { CountryPicker } from '../country-picker/country-picker';
import { GenderPicker } from '../gender-picker/gender-picker';
import { Input } from '../input/input';

export function Form() {
  return (
    <form className="flex flex-col w-130 m-auto border-slate-300 border-2 rounded p-5 h-150">
      <Input type="text" name="first-name" />
      <Input type="email" name="Email" />
      <div className="flex flex-row my-2 border-2 border-slate-300 p-2 rounded">
        <Input type="password" name="password" />
        <Input type="password" name="confirm password" />
      </div>
      <GenderPicker />
      <CountryPicker />
      <input type="submit" value="Send" className="bg-indigo-300 m-2 rounded" />
    </form>
  );
}
