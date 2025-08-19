'use client';

import { useState } from 'react';
import type { IChildrenNode } from '@interfaces';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function TanstackProvider({ children }: IChildrenNode) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
