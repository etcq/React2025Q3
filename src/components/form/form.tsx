import { useForm } from 'react-hook-form';
import { Input } from '../input/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchema,
  type TFormSchema,
} from '@/core/schema/form-validation.schema';
import { errorText } from '@/assets/style/classes';
import { GenderPicker } from '../gender-picker/gender-picker';
import { CountryPicker } from '../country-picker/country-picker';

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: TFormSchema) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-130 m-auto border-slate-300 border-2 rounded p-5 h-150"
    >
      <Input
        type="text"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <Input
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <div className="flex flex-row my-2 border-2 border-slate-300 p-2 rounded">
        <Input type="password" {...register('password')} />
        <Input
          type="password"
          {...register('confirmPassword')}
          error={errors.password?.message || errors.confirmPassword?.message}
        />
      </div>
      <GenderPicker register={register} error={errors.gender?.message} />
      <CountryPicker register={register} error={errors.country?.message} />
      <div className="flex flex-row items-center gap-1">
        <input type="checkbox" id="conditions" {...register('conditions')} />
        <label htmlFor="conditions">I access Terms and Conditions rules</label>
      </div>
      <span className={errorText}>{errors.conditions?.message}</span>
      <input type="submit" value="Send" className="bg-indigo-300 m-2 rounded" />
    </form>
  );
}
