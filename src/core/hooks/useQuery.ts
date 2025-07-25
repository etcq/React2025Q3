import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const useQueryUpdate = (page: number, query: string) => {
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (query === '') {
      setSearchParams((searchParams) => {
        searchParams.delete('search');
        searchParams.set('page', `${page}`);
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.set('search', `${query}`);
        searchParams.set('page', `${page}`);
        return searchParams;
      });
    }
  }, [page, query, setSearchParams]);
};
