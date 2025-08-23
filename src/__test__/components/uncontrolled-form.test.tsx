import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UncontrolledForm } from '@/components/form/uncontrolled-form';

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
});
