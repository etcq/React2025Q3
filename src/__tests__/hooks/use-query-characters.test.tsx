import { describe, it, expect } from 'vitest';
import * as apiService from '../../core/services/api-service';
import { response } from '../../mocks/mock-data';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { useQueryCharacters } from '../../core/hooks/query-hooks/use-query-characters';

describe('use query characters hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should return right data', async () => {
    const getCharactersSpy = vi
      .spyOn(apiService, 'getCharacters')
      .mockResolvedValue(response);
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useQueryCharacters('', 1), { wrapper });
    await waitFor(() => {
      expect(getCharactersSpy).toHaveBeenCalledWith('', 1);
      expect(result.current.data).toEqual(response);
    });
  });
  it('should return error if request fails', async () => {
    vi.spyOn(apiService, 'getCharacters').mockRejectedValue(
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
    const { result } = renderHook(() => useQueryCharacters('', 1), { wrapper });
    await waitFor(() => {
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });
});
