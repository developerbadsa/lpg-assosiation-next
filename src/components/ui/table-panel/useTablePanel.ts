'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef, SortState } from './types';

type Params<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  searchText?: (row: T) => string;

  initialPageSize?: number;
  pageSizeOptions?: number[];
  initialSort?: SortState;
};

export function useTablePanel<T>({
  rows,
  columns,
  searchText,
  initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  initialSort,
}: Params<T>) {
  const firstSortable = columns.find((c) => c.sortable)?.id;

  const [query, setQuery] = useState('');
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(() => initialSort ?? { id: firstSortable ?? columns[0]?.id ?? 'id', dir: 'asc' });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    if (!searchText) return rows;

    return rows.filter((r) => searchText(r).toLowerCase().includes(q));
  }, [rows, query, searchText]);

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.id === sort.id);
    if (!col?.sortable || !col.sortValue) return filtered;

    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));

      return sort.dir === 'asc' ? cmp : -cmp;
    });

    return arr;
  }, [filtered, columns, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const validPage = Math.min(page, pageCount);

  const startIdx = (validPage - 1) * pageSize;
  const endIdx = Math.min(sorted.length, startIdx + pageSize);
  const pageRows = sorted.slice(startIdx, endIdx);

  const showingFrom = sorted.length === 0 ? 0 : startIdx + 1;
  const showingTo = endIdx;

  const toggleSort = (columnId: string) => {
    const col = columns.find((c) => c.id === columnId);
    if (!col?.sortable) return;

    setSort((prev) => {
      if (prev.id === columnId) return { id: columnId, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { id: columnId, dir: 'asc' };
    });
  };

  const setPageSizeSafe = (n: number) => {
    setPageSize(n);
    setPage(1);
  };

  const setQuerySafe = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  return {
    // controls
    query,
    setQuery: setQuerySafe,
    pageSize,
    setPageSize: setPageSizeSafe,
    pageSizeOptions,

    // paging
    page: validPage,
    setPage,
    pageCount,

    // sorting
    sort,
    toggleSort,

    // data
    total: rows.length,
    filteredTotal: sorted.length,
    sortedRows: sorted,
    pageRows,

    // footer
    showingFrom,
    showingTo,
  };
}
