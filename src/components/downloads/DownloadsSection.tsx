'use client';

import {useMemo} from 'react';
import TablePanel from '@/components/ui/table-panel/TablePanel';
import type {ColumnDef} from '@/components/ui/table-panel/types';
import MeshCorners from '@/components/ui/MeshCorners';

import {MOCK_DOWNLOADS, TOTAL_MEMBERS, type DownloadRow} from './mockDownloads';

function cx(...v: Array<string | false | null | undefined>) {
   return v.filter(Boolean).join(' ');
}

function ActionButton({
   label,
   href,
   variant,
}: {
   label: string;
   href?: string;
   variant: 'view' | 'download';
}) {
   const base =
      'inline-flex h-6 items-center justify-center rounded-[4px] px-4 text-[10px] font-semibold text-white shadow-sm transition hover:brightness-110 active:brightness-95';

   const cls = variant === 'view' ? 'bg-[#133374]' : 'bg-[#009970]';

   // keep it simple for now; replace with modal/file later
   return (
      <a
         href={href ?? '#'}
         className={cx(base, cls)}
         onClick={e => {
            if (!href || href === '#') e.preventDefault();
         }}>
         {label}
      </a>
   );
}

export default function DownloadsSection() {
   const columns = useMemo<ColumnDef<DownloadRow>[]>(
      () => [
         {
            id: 'sl',
            header: 'SL#',
            sortable: true,
            sortValue: r => r.sl,
            csvHeader: 'SL',
            csvValue: r => r.sl,
            headerClassName: 'w-[70px]',
            minWidth: 70,
            cell: r => String(r.sl).padStart(2, '0'),
         },
         {
            id: 'title',
            header: 'Title',
            sortable: true,
            sortValue: r => r.title,
            csvHeader: 'Title',
            csvValue: r => r.title,
            minWidth: 380,
            cell: r => <span className='text-inherit'>{r.title}</span>,
         },
         {
            id: 'publishedDate',
            header: 'Published Date',
            sortable: true,
            sortValue: r => r.publishedDate,
            csvHeader: 'Published Date',
            csvValue: r => r.publishedDate,
            minWidth: 160,
            cell: r => <span className='text-inherit'>{r.publishedDate}</span>,
         },
         {
            id: 'view',
            header: 'View',
            sortable: false,
            csvHeader: 'View',
            csvValue: () => '',
            minWidth: 120,
            cell: r => (
               <div className='w-full flex justify-center'>
                  <ActionButton label='View' href={r.viewUrl} variant='view' />
               </div>
            ),
         },
         {
            id: 'download',
            header: 'Download',
            sortable: false,
            csvHeader: 'Download',
            csvValue: () => '',
            minWidth: 140,
            cell: r => (
               <div className='w-full flex justify-center'>
                  <ActionButton
                     label='Download'
                     href={r.downloadUrl}
                     variant='download'
                  />
               </div>
            ),
         },
      ],
      []
   );

   return (
      <section className='relative overflow-hidden bg-[#F4F9F4] py-14'>
         <div className='absolute inset-x-0 top-0 h-[3px] bg-[#6CC12A]' />

         <MeshCorners
            className='z-0'
            color='#2D8A2D'
            opacity={0.18}
            width={760}
            height={480}
            strokeWidth={1}
         />

         <div className='pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(45,138,45,0.10),transparent_60%),radial-gradient(900px_520px_at_82%_10%,rgba(45,138,45,0.10),transparent_60%)]' />

         <div className='lpg-container relative z-10'>
            <TablePanel
               rows={MOCK_DOWNLOADS}
               columns={columns}
               getRowKey={r => String(r.sl)}
               // screenshot has NO export button
               exportFileName=''
               searchText={r => [r.title, r.publishedDate].join(' ')}
               totalLabel={() => (
                  <div className='text-[14px] font-semibold text-[#2D8A2D]'>
                     Total Members :{' '}
                     <span className='text-[#133374]'>{TOTAL_MEMBERS}</span>
                  </div>
               )}
            />
         </div>
      </section>
   );
}
