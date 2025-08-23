import type { FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { fileTypes, ValidationMessages } from '@constants';
import { countries } from '../stores/country-store';

export type TFormSchema = z.infer<typeof formSchema> & FieldValues;

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
      message: 'You should access to terms and conditions',
    }),
    picture: z
      .instanceof(FileList)
      .refine((files) => files?.length >= 1, { message: 'Image is required' })
      .refine((files) => fileTypes.includes(files?.[0]?.type), {
        message: 'File must be .jpeg, .jpg or .png',
      })
      .refine((files) => files?.[0]?.size <= 5000000, {
        message: 'Max file size is 5MB',
      }),
  })
  .refine((data) => data.password === data.confirmed, {
    path: ['confirmed'],
    message: ValidationMessages.PASSWORDS_DO_NOT_MATCH,
  });

export const uncontrolledFormSchema = formSchema
  .extend({
    conditions: z.refine((val) => val === 'on', {
      message: 'You should access to terms and conditions',
    }),
    picture: z
      .instanceof(File)
      .refine((file) => !!file, { message: 'Image is required' })
      .refine((file) => fileTypes.includes(file?.type), {
        message: 'File must be .jpeg, .jpg or .png',
      })
      .refine((files) => files?.size <= 5000000, {
        message: 'Max file size is 5MB',
      }),
  })
  .refine((data) => data.password === data.confirmed, {
    path: ['confirmed'],
    message: ValidationMessages.PASSWORDS_DO_NOT_MATCH,
  });

export type TControlledForm = z.infer<typeof controlledFormSchema> &
  FieldValues;

export type TUncontrolledForm = z.infer<typeof uncontrolledFormSchema> &
  FieldValues;

export const fieldNames = Object.keys(uncontrolledFormSchema.shape);
