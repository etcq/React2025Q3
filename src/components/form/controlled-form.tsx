import { useForm } from 'react-hook-form';
import { Input } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  controlledFormSchema,
  type TControlledForm,
  type TFormSchema,
} from '@/core/schema/form-validation.schema';
import { button, errorText, fileInput } from '@style/classes';
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
  } = useForm<TControlledForm>({
    resolver: zodResolver(controlledFormSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: TFormSchema) => {
    imageToBase(data.picture[0]).then((img) => {
      setInformation({
        ...data,
        conditions: data.conditions ? 'on' : 'off',
        picture: img,
        picture_base64: `${img.slice(0, 70)}...`,
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
        id="name"
        type="text"
        placeholder="Jogn"
        showName="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        id="email"
        type="email"
        showName="email"
        placeholder="doe@mail.com"
        {...register('email')}
        error={errors.email?.message}
      />
      <PasswordField register={register} errors={errors} />
      <GenderPicker register={register} error={errors.gender?.message} />
      <CountryPicker register={register} errors={errors} />
      <div className="flex flex-row items-center gap-1">
        <input type="checkbox" id="conditions" {...register('conditions')} />
        <label htmlFor="conditions">I access Terms and Conditions rules</label>
      </div>
      <span className={errorText}>{errors.conditions?.message}</span>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="picture">Put your picture</label>
        <input
          type="file"
          {...register('picture')}
          className={fileInput}
          id="picture"
        />
      </div>
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
