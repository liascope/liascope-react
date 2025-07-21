'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AstroProvider } from './context/AstroContext';
import { useState } from 'react';
export default function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },refetchOnWindowFocus : false
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
     <AstroProvider>
       {children}
      </AstroProvider>
    </QueryClientProvider>
  );
}
