import { useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

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

  return { page, setPage, maxPage, setMaxPage, nextPage, prevPage };
};
