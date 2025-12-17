'use client';

import type { ColumnDef, SortState } from './types';
import { exportRowsToCsv } from './exportCsv';
import { useTablePanel } from './useTablePanel';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

function alignClass(align?: ColumnDef<any>['align']) {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function SortIcon({ active, dir }: { active: boolean; dir: SortState['dir'] }) {
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

function getPages(page: number, pageCount: number) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);

  const items: Array<number | '...'> = [];
  const left = Math.max(1, page - 2);
  const right = Math.min(pageCount, page + 2);

  items.push(1);
  if (left > 2) items.push('...');

  for (let p = left; p <= right; p++) {
    if (p !== 1 && p !== pageCount) items.push(p);
  }

  if (right < pageCount - 1) items.push('...');
  items.push(pageCount);
  return items;
}

type Props<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  getRowKey: (row: T, index: number) => string;

  searchText?: (row: T) => string;

  exportFileName?: string; // if provided, shows Export button
  exportLabel?: string;

  totalLabel?: (filteredTotal: number) => React.ReactNode;

  className?: string;
  tableMinWidth?: number;
};











export default function TablePanel<T>({
  rows,
  columns,
  getRowKey,
  searchText,
  exportFileName = 'export.csv',
  exportLabel = 'Export to Excel',
  totalLabel,
  className,
  tableMinWidth = 920,
}: Props<T>) {
  const s = useTablePanel({ rows, columns, searchText });

  const tableWidth = Math.max(
    tableMinWidth,
    columns.reduce((acc, c) => acc + (c.minWidth ?? 0), 0)
  );

  const headerLeft =
    totalLabel?.(s.filteredTotal) ?? (
      <div className="text-[14px] font-semibold text-[#2D8A2D]">
        Total Members : <span className="text-[#133374]">{s.filteredTotal}</span>
      </div>
    );


    console.log(  columns,


)

  return (
    <div className={cx('rounded-[18px] bg-white/80 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] backdrop-blur md:p-6', className)}>
      {/* top bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {headerLeft}

        {Boolean(exportFileName) && (
          <button
            type="button"
            onClick={() => exportRowsToCsv(s.sortedRows, columns, exportFileName)}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] bg-[#0B8B4B] px-4 text-[12px] font-medium text-white shadow-sm transition hover:brightness-110 active:brightness-95"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <path d="M7 3h10a2 2 0 0 1 2 2v14H5V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 8h8M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            {exportLabel}
          </button>
        )}
      </div>

      {/* controls row (match screenshot layout) */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-[11px] text-[#6F8093]">
          <span>Show</span>
          <select
            value={s.pageSize}
            onChange={(e) => s.setPageSize(Number(e.target.value))}
            className="h-8 w-[64px] rounded-[6px] border border-black/10 bg-white px-2 text-[11px] text-[#2B3A4A] shadow-sm outline-none focus:border-[#0B8B4B]"
          >
            {s.pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-[11px] text-[#6F8093]">
          <span>Search:</span>
          <input
            value={s.query}
            onChange={(e) => s.setQuery(e.target.value)}
            className="h-8 w-full rounded-[6px] border border-black/10 bg-white px-3 text-[11px] text-[#2B3A4A] shadow-sm outline-none focus:border-[#0B8B4B] md:w-[220px]"
          />
        </label>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-[12px] border border-black/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: tableWidth }}>
            <thead className="bg-[#0B8B4B]">
              <tr>
                {columns.map((col, idx) => {
                  const active = s.sort.id === col.id;
                  const clickable = Boolean(col.sortable);

                  return (
                    <th
                      key={col.id}
                      scope="col"
                      className={cx(
                        'whitespace-nowrap px-4 py-4 text-[11px] font-semibold text-white',
                        alignClass(col.align),
                        idx !== columns.length - 1 && 'border-r border-white/15',
                        col.headerClassName
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => clickable && s.toggleSort(col.id)}
                        disabled={!clickable}
                        className={cx('inline-flex items-center', !clickable && 'cursor-default')}
                      >
                        {col.header}
                        {col.sortable && <SortIcon active={active} dir={s.sort.dir} />}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {s.pageRows.map((row, rIdx) => (
                <tr key={getRowKey(row, rIdx)} className="border-t border-black/5">
                  {columns.map((col, cIdx) => (
                    <td
                      key={col.id}
                      className={cx(
                        'px-4 py-4 text-[11px] text-[#3C4B5A]',
                        alignClass(col.align),
                        cIdx !== columns.length - 1 && 'border-r border-black/5',
                        col.cellClassName
                      )}
                    >
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}

              {s.pageRows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-[12px] text-[#7B8EA3]">
                    No matching results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* footer row (showing + pagination) */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] text-[#7B8EA3]">
          Showing {s.showingFrom} to {s.showingTo} of {s.filteredTotal} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={s.page <= 1}
            onClick={() => s.setPage(s.page - 1)}
            className="h-7 rounded-[6px] border border-black/10 bg-white px-3 text-[11px] text-[#6F8093] disabled:opacity-60"
          >
            Previous
          </button>

          <div className="flex items-center gap-1 rounded-[8px] border border-black/10 bg-[#F5F7F9] p-[2px]">
            {getPages(s.page, s.pageCount).map((p, idx) =>
              p === '...' ? (
                <span key={`e-${idx}`} className="px-2 text-[11px] text-[#6F8093]">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => s.setPage(p)}
                  className={cx(
                    'h-7 min-w-7 rounded-[6px] border px-2 text-[11px]',
                    p === s.page
                      ? 'border-[#0B8B4B] bg-[#0B8B4B] text-white'
                      : 'border-black/10 bg-white text-[#6F8093] hover:border-[#0B8B4B]/40'
                  )}
                >
                  {String(p).padStart(2, '0')}
                </button>
              )
            )}
          </div>

          <button
            type="button"
            disabled={s.page >= s.pageCount}
            onClick={() => s.setPage(s.page + 1)}
            className="h-7 rounded-[6px] border border-black/10 bg-white px-3 text-[11px] text-[#6F8093] disabled:opacity-60"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
