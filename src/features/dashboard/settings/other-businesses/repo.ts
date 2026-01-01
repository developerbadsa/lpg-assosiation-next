import { normalizeList } from '@/lib/http/normalize';
import type { OtherBusinessInput, OtherBusinessRow } from './types';

type OtherBusinessApiRow = {
  id: number | string;
  name?: string | null;
};

const BASE = '/api/other-businesses';

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function mapRow(row: OtherBusinessApiRow, idx: number): OtherBusinessRow | null {
  const idNum = Number(row.id);
  if (!Number.isFinite(idNum)) return null;
  const name = (row.name ?? '').toString().trim() || `Other Business #${idNum}`;
  return {
    id: String(idNum),
    sl: idx + 1,
    name,
  };
}

export const otherBusinessesRepo = {
  async list() {
    const res = await fetch(BASE, {
      method: 'GET',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    const raw = await safeJson(res);
    if (!res.ok) throw new Error(raw?.message ?? 'Failed to load other businesses');

    const rows = normalizeList<OtherBusinessApiRow>(raw);
    return rows.map(mapRow).filter(Boolean) as OtherBusinessRow[];
  },

  async create(input: OtherBusinessInput) {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message ?? 'Failed to create other business');
  },

  async update(id: string, patch: OtherBusinessInput) {
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) throw new Error('Invalid other business id');

    const res = await fetch(`${BASE}/${idNum}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message ?? 'Failed to update other business');
  },

  async remove(id: string) {
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) throw new Error('Invalid other business id');

    const res = await fetch(`${BASE}/${idNum}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message ?? 'Failed to delete other business');
  },
};
