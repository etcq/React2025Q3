import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useParamsUpdate = (page: number, query: string) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (query === '') {
      params.delete('search');
    } else {
      params.set('search', `${query}`);
    }
    params.set('page', `${page}`);
    replace(`${path}?${params.toString()}`);
  }, [page, query, searchParams, path, replace]);
};
