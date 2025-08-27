import {
  fieldNames,
  type TUncontrolledForm,
} from '../schema/form-validation.schema';

export const imageToBase = (image: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (typeof base64 === 'string') {
        resolve(base64);
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
