import { useForm } from 'react-hook-form';
import { Input } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchema,
  type TFormSchema,
} from '@/core/schema/form-validation.schema';
import { button, errorText } from '@style/classes';
import { GenderPicker } from '@components';
import { CountryPicker } from '@components';
import { useFormInformationStore } from '@stores/form-information-store';
import { imageToBase } from '@/core/utils';
import { PasswordField } from '../password/password-field';
import { useModalControl } from '@/core/stores/modal-control-store';

export function FormControlled() {
  const { setInformation } = useFormInformationStore();
  const { setModalStatus } = useModalControl();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: TFormSchema) => {
    imageToBase(data.picture[0]).then((img) => {
      setInformation({
        ...data,
        picture: img,
        shortPicture: `${img.slice(0, 70)}...`,
      });
    });
    setModalStatus(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-130 m-auto border-slate-300 border-2 rounded p-5 h-180 bg-slate-950"
    >
      <Input
        type="text"
        showName="Name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <Input
        type="email"
        showName="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <PasswordField register={register} errors={errors} />
      <GenderPicker register={register} error={errors.gender?.message} />
      <CountryPicker register={register} error={errors.country?.message} />
      <div className="flex flex-row items-center gap-1">
        <input type="checkbox" id="conditions" {...register('conditions')} />
        <label htmlFor="conditions">I access Terms and Conditions rules</label>
      </div>
      <span className={errorText}>{errors.conditions?.message}</span>
      <input
        type="file"
        {...register('picture')}
        className="text-sm text-stone-500 
   file:mr-5 file:py-1 file:px-3 file:border-[1px] rounded
   file:text-xs file:font-medium
   file:bg-slate-300 file:text-stale-900
   hover:file:cursor-pointer hover:file:bg-slate-50
   hover:file:text-indigo-700"
      />
      <span className={errorText}>{errors.picture?.message?.toString()}</span>
      <input
        type="submit"
        value="Send"
        className={button}
        disabled={!isValid}
      />
    </form>
  );
}
