export type StationDocumentRow = {
  id: string;
  sl: number;
  stationId?: number;
  documentType: string;
  fileUrl?: string | null;
};

export type StationDocumentInput = {
  gasStationId: number;
  documentType: string;
  file?: File | null;
};
