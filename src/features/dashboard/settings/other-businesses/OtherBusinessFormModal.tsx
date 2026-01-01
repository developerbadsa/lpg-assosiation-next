'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import type { OtherBusinessInput, OtherBusinessRow } from './types';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: OtherBusinessRow | null;
  saving?: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (payload: OtherBusinessInput) => void | Promise<void>;
};

export default function OtherBusinessFormModal({
  open,
  mode,
  initial,
  saving,
  error,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initial?.name ?? '');

  const title = mode === 'create' ? 'Add Other Business' : 'Edit Other Business';

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? '');
  }, [open, initial]);

  return (
    <Modal open={open} title={title} onClose={onClose} maxWidthClassName="max-w-[520px]">
      <form
        className="space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ name: name.trim() });
        }}
      >
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#2B3A4A]">
            Business Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-9 w-full rounded-[6px] border border-[#E5E7EB] px-3 text-[12px]"
            placeholder="Enter business name"
            required
          />
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
