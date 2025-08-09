import { describe, it, expect } from 'vitest';
import * as apiService from '../../core/services/api-service';
import { response } from '../../mocks/mock-data';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { useQueryDetailedCharacter } from '../../core/hooks/query-hooks/use-query-detailed-character';

describe('use query characters hook', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should return right data', async () => {
    vi.spyOn(apiService, 'getCharacter').mockResolvedValue(
      response.characters[0]
    );
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useQueryDetailedCharacter('1'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(response.characters[0]);
    });
  });
  it('should return error if request failed', async () => {
    vi.spyOn(apiService, 'getCharacter').mockRejectedValue(
      new Error('Network Error')
    );
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useQueryDetailedCharacter('1'), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.isError).toBe(true);
    });
  });
});
