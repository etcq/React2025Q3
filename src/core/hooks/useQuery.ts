import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const useQueryUpdate = (page: number, query: string) => {
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams((searchParams) => {
      if (query === '') {
        searchParams.delete('search');
      } else {
        searchParams.set('search', `${query}`);
      }
      searchParams.set('page', `${page}`);
      return searchParams;
    });
  }, [page, query, setSearchParams]);
};
