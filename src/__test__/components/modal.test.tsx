import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormResult } from '@/components/form-result/form-result';
import userEvent from '@testing-library/user-event';

describe('Modal component', () => {
  it('should be open', () => {
    render(<FormResult />);
    const button = screen.getByText('Open Controlled Form');
    fireEvent.click(button);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });
  it('should be closing by ESC key', async () => {
    render(<FormResult />);
    const button = screen.getByText('Open Controlled Form');
    fireEvent.click(button);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });
  it('should be closing by outside click', async () => {
    render(<FormResult />);
    const button = screen.getByText('Open Controlled Form');
    fireEvent.click(button);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    const overlay = screen.getByTestId('overlay');
    await userEvent.click(overlay);
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });
});
