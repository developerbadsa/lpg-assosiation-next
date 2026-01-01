'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { otherBusinessesRepo } from './repo';
import type { OtherBusinessInput } from './types';

const keys = {
  all: ['settings', 'other-businesses'] as const,
};

export function useOtherBusinesses() {
  return useQuery({
    queryKey: keys.all,
    queryFn: () => otherBusinessesRepo.list(),
  });
}

export function useCreateOtherBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: OtherBusinessInput) => otherBusinessesRepo.create(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateOtherBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: OtherBusinessInput }) =>
      otherBusinessesRepo.update(id, patch),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteOtherBusiness() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => otherBusinessesRepo.remove(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
