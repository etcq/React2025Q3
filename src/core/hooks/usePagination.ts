import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, setSearchParams]);

  const nextPage = () => {
    if (page < maxPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  return {
    page,
    searchParams,
    resetPage,
    maxPage,
    setMaxPage,
    nextPage,
    prevPage,
  };
};
