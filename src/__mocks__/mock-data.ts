import type { TConvertedForm } from '@stores/form-information-store';

export const mockUser: TConvertedForm = {
  name: 'John',
  email: 'johndoe@mail.com',
  password: '123Ff!',
  confirmed: '123Ff!',
  gender: 'man',
  country: 'USA',
  conditions: 'on',
  picture: 'data:image/jpeg;base64',
  picture_base64:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QpqRXhpZgAATU0AKgA...',
};

export const mockUserAfterPrepare: Omit<TConvertedForm, 'picture_base64'> = {
  name: 'John',
  email: 'johndoe@mail.com',
  password: '123Ff!',
  confirmed: '123Ff!',
  gender: 'man',
  country: 'USA',
  conditions: 'on',
  picture: 'data:image/jpeg;base64',
};

export const file = new File(['this is image'], 'hello.jpg', {
  type: 'image/jpg',
});
