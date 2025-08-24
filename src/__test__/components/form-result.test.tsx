import { describe, it } from 'vitest';
import { render, act } from '@testing-library/react';
import { FormResult } from '@components';
import { useFormInformationStore } from '@/core/stores/form-information-store';
import { mockUser } from '@/__mocks__/mock-data';

describe('Information store', () => {
  it('Should have init value by empty', () => {
    render(<FormResult />);
    expect(useFormInformationStore.getState().information).toHaveLength(0);
    act(() => {
      useFormInformationStore.getState().setInformation(mockUser);
    });
    expect(useFormInformationStore.getState().information).toHaveLength(1);
  });
});
