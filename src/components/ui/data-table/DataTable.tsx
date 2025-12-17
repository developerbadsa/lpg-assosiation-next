'use client';

import type { ColumnDef, SortState } from './types';

type Props<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  getRowKey: (row: T, index: number) => string;

  sort?: SortState;
  onSort?: (columnId: string) => void;

  tableMinWidth?: number;
  emptyState?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function alignClass(align?: ColumnDef<any>['align']) {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function SortMark({ active, dir }: { active: boolean; dir: SortState['dir'] }) {
  return (
    <span className={cx('ml-2 inline-flex items-center', active ? 'opacity-100' : 'opacity-60')}>
      <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 10l4-4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active && dir === 'asc' ? 1 : 0.5}
        />
        <path
          d="M16 14l-4 4-4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active && dir === 'desc' ? 1 : 0.5}
        />
      </svg>
    </span>
  );
}

export default function DataTable<T>({
  rows,
  columns,
  getRowKey,
  sort,
  onSort,
  tableMinWidth = 980,
  emptyState = 'No data found.',
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-black/10 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: tableMinWidth }}>
          <thead className="bg-[#0B8B4B]">
            <tr>
              {columns.map((col) => {
                const active = sort?.id === col.id;
                const clickable = Boolean(col.sortable && onSort);

                return (
                  <th
                    key={col.id}
                    scope="col"
                    className={cx(
                      'whitespace-nowrap px-4 py-3 text-[11px] font-semibold text-white',
                      alignClass(col.align),
                      col.headerClassName
                    )}
                    aria-sort={
                      active ? (sort?.dir === 'asc' ? 'ascending' : 'descending') : 'none'
                    }
                  >
                    <button
                      type="button"
                      disabled={!clickable}
                      onClick={() => onSort?.(col.id)}
                      className={cx('inline-flex items-center', !clickable && 'cursor-default')}
                    >
                      {col.header}
                      {col.sortable && <SortMark active={active} dir={sort?.dir ?? 'asc'} />}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr key={getRowKey(row, idx)} className="border-t border-black/5">
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={cx(
                      'px-4 py-3 text-[11px] text-[#3C4B5A]',
                      alignClass(col.align),
                      col.cellClassName
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-[12px] text-[#7B8EA3]">
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
