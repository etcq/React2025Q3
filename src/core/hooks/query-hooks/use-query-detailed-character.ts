import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCharacter } from '../../services/api-service';

export const useQueryDetailedCharacter = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const { data, isPending, isError, isFetching } = useQuery({
    queryKey: ['character-detailed', id],
    queryFn: () => getCharacter(id),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    retry: false,
  });

  const resetData = () => {
    queryClient.invalidateQueries({
      queryKey: ['character-detailed'],
      exact: false,
    });
  };

  return { data, isPending, isFetching, isError, resetData };
};
