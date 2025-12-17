import type { ReactNode } from 'react';

export type SortDir = 'asc' | 'desc';
export type SortState = { id: string; dir: SortDir };

export type ColumnDef<T> = {
  id: string;
  header: ReactNode;

  // cell renderer
  cell: (row: T) => ReactNode;

  // layout
  headerClassName?: string;
  cellClassName?: string;
  align?: 'left' | 'center' | 'right';

  // sorting
  sortable?: boolean;

  // optional: for CSV export later
  csvValue?: (row: T) => string | number;
};
