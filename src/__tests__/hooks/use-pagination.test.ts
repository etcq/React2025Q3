import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../core/hooks/usePagination.ts';
import { describe, it } from 'vitest';

describe('hook work', () => {
  it('increments and decrements page correctly', () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
    act(() => {
      result.current.setMaxPage(10);
    });

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.page).toBe(2);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.page).toBe(1);
  });
});
