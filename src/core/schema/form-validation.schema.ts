import type { FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { ValidationMessages } from '@constants';
import { useCountryStore } from '../stores/country-store';

export type TFormSchema = z.infer<typeof formSchema> & FieldValues;
export const countries = useCountryStore.getState().countries;
const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: ValidationMessages.REQUIRED,
    })
    .min(2, {
      message: ValidationMessages.NAME_TOO_SHORT,
    })
    .regex(/[A-Z][a-z]/, {
      message: ValidationMessages.NAME_LETTER,
    })
    .refine(
      (val) => (val.length > 0 ? val[0].toUpperCase() === val[0] : true),
      {
        message: ValidationMessages.FIRST_LETTER_UPPERCASE,
      }
    ),
  email: z
    .string()
    .min(1, {
      message: ValidationMessages.REQUIRED,
    })
    .email({
      message: ValidationMessages.EMAIL_INVALID,
    }),
  password: z
    .string()
    .min(1, {
      message: ValidationMessages.REQUIRED,
    })
    .min(5, {
      message: ValidationMessages.PASSWORD_TOO_SHORT,
    })
    .regex(/^\S*$/, {
      message: ValidationMessages.WHITESPACE,
    })
    .regex(/[a-z]/, {
      message: ValidationMessages.PASSWORD_MISSING_LOWERCASE,
    })
    .regex(/[A-Z]/, {
      message: ValidationMessages.PASSWORD_MISSING_UPPERCASE,
    })
    .regex(/\d/, {
      message: ValidationMessages.PASSWORD_MISSING_DIGIT,
    })
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: ValidationMessages.PASSWORDS_MISSING_SPECIAL,
    }),
  confirmed: z.string().min(1, {
    message: ValidationMessages.REQUIRED,
  }),
  gender: z.enum(['man', 'woman'], {
    message: ValidationMessages.SELECT_GENDER,
  }),
  country: z.string().refine((data) => countries.includes(data), {
    message: ValidationMessages.SELECT_COUNTRY,
  }),
});

export const controlledFormSchema = formSchema
  .extend({
    conditions: z.literal(true, {
      message: ValidationMessages.ACCESS_CONDITIONS,
    }),
    picture: z
      .instanceof(FileList)
      .refine((files) => files?.length >= 1, {
        message: ValidationMessages.IMAGE_REQUIRED,
      })
      .refine((files) => fileTypes.includes(files?.[0]?.type), {
        message: ValidationMessages.IMAGE_FORMAT,
      })
      .refine((files) => files?.[0]?.size <= 5000000, {
        message: ValidationMessages.IMAGE_SIZE,
      }),
  })
  .refine((data) => data.password === data.confirmed, {
    path: ['confirmed'],
    message: ValidationMessages.PASSWORDS_DO_NOT_MATCH,
    when(payload) {
      return controlledFormSchema
        .pick({ password: true, confirmed: true })
        .safeParse(payload.value).success;
    },
  });

export const uncontrolledFormSchema = formSchema
  .extend({
    conditions: z.refine((val) => val === 'on', {
      message: ValidationMessages.ACCESS_CONDITIONS,
    }),
    picture: z
      .instanceof(File)
      .refine((file) => fileTypes.includes(file?.type), {
        message: ValidationMessages.IMAGE_FORMAT,
      })
      .refine((files) => files?.size <= 5000000, {
        message: ValidationMessages.IMAGE_SIZE,
      }),
  })
  .refine((data) => data.password === data.confirmed, {
    path: ['confirmed'],
    message: ValidationMessages.PASSWORDS_DO_NOT_MATCH,

    when(payload) {
      return uncontrolledFormSchema
        .pick({ password: true, confirmed: true })
        .safeParse(payload.value).success;
    },
  });

export type TControlledForm = z.infer<typeof controlledFormSchema> &
  FieldValues;

export type TUncontrolledForm = z.infer<typeof uncontrolledFormSchema> &
  FieldValues & { picture_base64?: string };

export const fieldNames = Object.keys(uncontrolledFormSchema.shape);
