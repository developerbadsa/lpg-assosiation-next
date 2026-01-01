'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stationDocumentsRepo } from './repo';
import type { StationDocumentInput } from './types';

const keys = {
  all: ['settings', 'station-documents'] as const,
};

export function useStationDocuments() {
  return useQuery({
    queryKey: keys.all,
    queryFn: () => stationDocumentsRepo.list(),
  });
}

export function useCreateStationDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: StationDocumentInput) => stationDocumentsRepo.create(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateStationDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: StationDocumentInput }) =>
      stationDocumentsRepo.update(id, patch),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteStationDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => stationDocumentsRepo.remove(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
