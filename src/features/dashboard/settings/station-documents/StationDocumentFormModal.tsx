'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import type { StationDocumentInput, StationDocumentRow } from './types';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: StationDocumentRow | null;
  saving?: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (payload: StationDocumentInput) => void | Promise<void>;
};

export default function StationDocumentFormModal({
  open,
  mode,
  initial,
  saving,
  error,
  onClose,
  onSubmit,
}: Props) {
  const [stationId, setStationId] = useState(initial?.stationId?.toString() ?? '');
  const [documentType, setDocumentType] = useState(initial?.documentType ?? '');
  const [file, setFile] = useState<File | null>(null);

  const title = mode === 'create' ? 'Add Station Document' : 'Edit Station Document';

  useEffect(() => {
    if (!open) return;
    setStationId(initial?.stationId?.toString() ?? '');
    setDocumentType(initial?.documentType ?? '');
    setFile(null);
  }, [open, initial]);

  return (
    <Modal open={open} title={title} onClose={onClose} maxWidthClassName="max-w-[520px]">
      <form
        className="space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();

          const idNum = Number(stationId);
          if (!Number.isFinite(idNum)) return;

          onSubmit({
            gasStationId: idNum,
            documentType: documentType.trim(),
            file,
          });
        }}
      >
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#2B3A4A]">
            Gas Station ID
          </label>
          <input
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
            className="h-9 w-full rounded-[6px] border border-[#E5E7EB] px-3 text-[12px]"
            placeholder="e.g. 12"
            inputMode="numeric"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#2B3A4A]">
            Document Type
          </label>
          <input
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="h-9 w-full rounded-[6px] border border-[#E5E7EB] px-3 text-[12px]"
            placeholder="e.g. Trade License"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#2B3A4A]">
            File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-[12px]"
            required={mode === 'create'}
          />
          {mode === 'edit' ? (
            <p className="text-[11px] text-[#64748B]">Leave empty to keep existing file.</p>
          ) : null}
        </div>

        {error ? <div className="text-[12px] text-red-600">{error}</div> : null}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-[6px] border border-[#E5E7EB] px-4 text-[12px] font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-9 rounded-[6px] bg-[#009970] px-4 text-[12px] font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
