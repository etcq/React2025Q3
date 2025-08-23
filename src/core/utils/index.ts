import {
  fieldNames,
  type TUncontrolledForm,
} from '../schema/form-validation.schema';

export const imageToBase = (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (typeof base64 === 'string') {
        resolve(base64);
      } else {
        reject(new Error("Can't convert image to base64"));
      }
    };
  });
};

export const prepareFormData = (formData: FormData) => {
  const result: Partial<TUncontrolledForm> = {};
  fieldNames.map((name: string) => {
    result[name] = formData.get(name);
  });
  return result;
};

export const checkPasswordStrength = (password: string) => {
  let strength = 0;
  if (/\d/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;
  if (password.length >= 8) strength++;

  return strength;
};
