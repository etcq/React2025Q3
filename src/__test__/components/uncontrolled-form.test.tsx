import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UncontrolledForm } from '@/components/form/uncontrolled-form';
import userEvent from '@testing-library/user-event';
import * as utils from '@/core/utils';
import { ValidationMessages } from '@/core/constants';

vi.mock('@/constants', () => ({
  fileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
}));

describe('Controlled-form should be rendered', () => {
  it('Rendered with all fields', () => {
    render(<UncontrolledForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Abc12Cfw!')).toHaveLength(2);
    expect(screen.getByLabelText('Man')).toBeInTheDocument();
    expect(screen.getByLabelText('Woman')).toBeInTheDocument();
    expect(
      screen.getByLabelText('I access Terms and Conditions rules')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Put your picture')).toBeInTheDocument();
  });
  it('Should not submit if form have a validation error', async () => {
    const spyConvertImage = vi.spyOn(utils, 'imageToBase');
    render(<UncontrolledForm />);
    await userEvent.setup();
    await userEvent.click(screen.getByText('Send'));
    expect(spyConvertImage).not.toBeCalled();
    expect(
      screen.getByText(ValidationMessages.NAME_LETTER)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ValidationMessages.EMAIL_INVALID)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ValidationMessages.PASSWORDS_MISSING_SPECIAL)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ValidationMessages.SELECT_GENDER)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ValidationMessages.SELECT_COUNTRY)
    ).toBeInTheDocument();
  });
});
