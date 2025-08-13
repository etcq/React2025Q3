import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacters } from '../../services/api-service';

export const useQueryCharacters = (savedQuery: string, page: number) => {
  const queryClient = useQueryClient();
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ['characters', savedQuery, page],
    queryFn: () => getCharacters(savedQuery, page),
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

  const resetListData = () => {
    queryClient.invalidateQueries({
      queryKey: ['characters'],
      exact: false,
    });
  };

  return { data, isPending, isFetching, isError, resetListData, error };
};
