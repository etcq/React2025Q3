import type { FieldValues } from 'react-hook-form';
import * as z from 'zod';
import { fileTypes, ValidationMessages } from '@constants';
import { countries } from '../stores/country-store';

export type TFormSchema = z.infer<typeof formSchema> & FieldValues;

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, {
        message: ValidationMessages.REQUIRED,
      })
      .refine(
        (val) => (val.length > 0 ? val[0].toUpperCase() === val[0] : true),
        {
          message: 'First letter must be to Upper',
        }
      ),
    email: z.email({
      message: ValidationMessages.EMAIL_INVALID,
    }),
    conditions: z.literal(true, {
      message: 'You should access to terms and conditions',
    }),
    password: z
      .string()
      .min(1, {
        message: ValidationMessages.REQUIRED,
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
      }),
    confirmPassword: z.string().min(1, {
      message: ValidationMessages.REQUIRED,
    }),
    gender: z.enum(['man', 'woman'], {
      message: 'Please select the gender',
    }),
    country: z.string().refine((data) => countries.includes(data), {
      message: 'Pick country',
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
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });
