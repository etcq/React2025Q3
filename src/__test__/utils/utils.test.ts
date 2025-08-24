import { describe, it, expect } from 'vitest';
import type { TConvertedForm } from '@/core/stores/form-information-store';
import { file, mockUserAfterPrepare } from '@/__mocks__/mock-data';
import { imageToBase, prepareFormData } from '@/core/utils';

const createFormData = (obj: Omit<TConvertedForm, 'picture_base64'>) => {
  const data = new FormData();
  Object.entries(obj).map(([key, value]) => {
    data.append(key, value);
  });
  return data;
};

describe('test utilities funtion', () => {
  it('Should convert formData to data object', () => {
    const formData = createFormData(mockUserAfterPrepare);
    const convertedData = prepareFormData(formData);
    expect(convertedData).toEqual(mockUserAfterPrepare);
  });
  it('Should convert file to base64', async () => {
    const result = await imageToBase(file);
    expect(result.startsWith('data:image/jpg;base64')).toBe(true);
  });
});
