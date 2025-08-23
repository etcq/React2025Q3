import { button, errorText, fileInput, form } from '@style/classes';
import { CountryPicker, GenderPicker, Input } from '@components';
import { uncontrolledFormSchema } from '@/core/schema/form-validation.schema';
import { ZodError } from 'zod';
import { PasswordField } from '../password/password-field';
import { imageToBase, prepareFormData } from '@/core/utils';
import { useFormInformationStore } from '@/core/stores/form-information-store';
import { useState, type FormEvent } from 'react';
import type { $ZodIssue } from 'zod/v4/core';
import { useModalControl } from '@/core/stores/modal-control-store';

export function UncontrolledForm() {
  const { setInformation } = useFormInformationStore();
  const { setModalStatus } = useModalControl();
  const [errors, setErrors] = useState<
    Record<string, { message: string[] | string }>
  >({});
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = prepareFormData(formData);
    console.log(data);
    try {
      uncontrolledFormSchema.parse(data);
      if (data && data.picture) {
        imageToBase(data.picture).then((img) => {
          setInformation({
            ...data,
            picture: img,
            picture_base64: `${img.slice(0, 70)}...`,
          });
        });
        setModalStatus(false);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, { message: string[] | string }> = {};
        error.issues.map((err: $ZodIssue) => {
          const field = String(err.path[0]);
          if (!errors[field]) {
            errors[field] = { message: '' };
          }
          errors[field].message = err.message;
        });
        console.log(errors);
        setErrors(errors);
      }
    }
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <Input
        type="text"
        showName="Name"
        name="name"
        error={errors.name?.message}
      />
      <Input
        type="email"
        showName="email"
        name="email"
        error={errors.email?.message}
      />
      <PasswordField errors={errors} />
      <GenderPicker errors={errors} />
      <CountryPicker errors={errors} />
      <div className="flex flex-row items-center gap-1">
        <input type="checkbox" id="conditions" name="conditions" />
        <label htmlFor="conditions">I access Terms and Conditions rules</label>
      </div>
      <span className={errorText}>{errors.conditions?.message}</span>
      <input type="file" className={fileInput} name="picture" />
      <span className={errorText}>{errors.picture?.message}</span>
      <input type="submit" value="Send" className={button} />
    </form>
  );
}
