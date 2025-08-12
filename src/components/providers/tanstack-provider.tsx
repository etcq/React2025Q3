'use client';

import { useState } from 'react';
import { IChildrenNode } from '../../core/interfaces/interface';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function TanstackProvider({ children }: IChildrenNode) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
