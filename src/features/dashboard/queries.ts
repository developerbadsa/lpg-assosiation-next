import {useQuery} from '@tanstack/react-query';
import {dashboardRepo} from './repo';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardRepo.getStats(),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
