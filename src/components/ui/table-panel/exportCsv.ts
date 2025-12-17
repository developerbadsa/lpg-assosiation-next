import type { ColumnDef } from './types';

export function exportRowsToCsv<T>(rows: T[], columns: ColumnDef<T>[], filename: string) {
  const header = columns.map((c) => c.csvHeader ?? (typeof c.header === 'string' ? c.header : c.id));

  const lines = [
    header,
    ...rows.map((r) =>
      columns.map((c) => {
        const raw = c.csvValue ? c.csvValue(r) : '';
        const s = String(raw ?? '');
        const escaped = s.replaceAll('"', '""');
        return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
      })
    ),
  ]
    .map((l) => l.join(','))
    .join('\n');

  const blob = new Blob([lines], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}
