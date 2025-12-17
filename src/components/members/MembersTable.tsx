'use client';

import DataTable from '@/components/ui/data-table/DataTable';
import type { ColumnDef, SortState, SortDir } from '@/components/ui/data-table/types';
import type { Member } from './mockMembers';

type SortKey =
  | keyof Pick<Member, 'sl' | 'ownerName' | 'memberId' | 'zone' | 'district' | 'upazila'>
  | 'stations';

type Props = {
  rows: Member[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
};

export default function MembersTable({ rows, sortKey, sortDir, onSort }: Props) {
  const columns: ColumnDef<Member>[] = [
    {
      id: 'sl',
      header: 'SL#',
      sortable: true,
      headerClassName: 'w-[70px]',
      cell: (m) => String(m.sl).padStart(2, '0'),
    },
    {
      id: 'photo',
      header: 'Photo',
      headerClassName: 'w-[90px]',
      cell: (m) => (
        <div className="h-9 w-9 overflow-hidden rounded-full bg-black/5 ring-1 ring-black/10">
          <img
            src={m.photoUrl}
            alt={m.ownerName}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ),
    },
    {
      id: 'ownerName',
      header: 'Owner Name',
      sortable: true,
      cell: (m) => <span className="text-[#2B5DAA]">{m.ownerName}</span>,
    },
    {
      id: 'memberId',
      header: 'ID',
      sortable: true,
      cell: (m) => <span className="text-[#2B5DAA]">{m.memberId}</span>,
    },
    {
      id: 'stations',
      header: 'Station Name',
      sortable: true,
      cell: (m) => (
        <div className="space-y-1">
          {m.stations.map((s, idx) => (
            <div key={idx} className="text-[#2B5DAA]">
              {s}
            </div>
          ))}
        </div>
      ),
    },
    { id: 'zone', header: 'Zone', sortable: true, cell: (m) => m.zone },
    { id: 'district', header: 'District', sortable: true, cell: (m) => m.district },
    { id: 'upazila', header: 'Upazila', sortable: true, cell: (m) => m.upazila },
  ];

  const sort: SortState = { id: sortKey, dir: sortDir };

  return (
    <DataTable
      rows={rows}
      columns={columns}
      getRowKey={(m) => String(m.sl)}
      sort={sort}
      onSort={(id) => onSort(id as SortKey)}
      tableMinWidth={980}
      emptyState="No matching members found."
    />
  );
}
