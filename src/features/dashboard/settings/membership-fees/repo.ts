import {env} from '@/lib/env';
import {mockDelay} from '@/lib/mockDelay';
import {normalizeList} from '@/lib/http/normalize';
import {MOCK_MEMBERSHIP_FEES} from './mock';
import type {MembershipFeeRow} from './types';

type MembershipFeeApiRow = {
  id: number | string;
  amount?: number | string | null;
  status?: string | null;
};

export type MembershipFeesRepo = {
  list: () => Promise<MembershipFeeRow[]>;
  remove: (id: string) => Promise<void>;
  // later: create/update
};

let store: MembershipFeeRow[] = structuredClone(MOCK_MEMBERSHIP_FEES);

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function mapRow(row: MembershipFeeApiRow, idx: number): MembershipFeeRow | null {
  const idNum = Number(row.id);
  if (!Number.isFinite(idNum)) return null;

  const amountNum =
    typeof row.amount === 'number' ? row.amount : Number(row.amount ?? 0);

  const statusRaw = (row.status ?? '').toString().trim().toUpperCase();
  const status = statusRaw === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE';

  return {
    id: String(idNum),
    sl: idx + 1,
    amount: Number.isFinite(amountNum) ? amountNum : 0,
    status,
  };
}

const mockRepo: MembershipFeesRepo = {
  async list() {
    await mockDelay(250);
    return store.map((r) => ({...r}));
  },
  async remove(id) {
    await mockDelay(250);
    store = store.filter((r) => r.id !== id);
  },
};

const apiRepo: MembershipFeesRepo = {
  async list() {
    const res = await fetch('/api/membership-fees', {
      method: 'GET',
      cache: 'no-store',
      headers: {Accept: 'application/json'},
    });

    const raw = await safeJson(res);
    if (!res.ok) throw new Error(raw?.message ?? 'Failed to load membership fees');

    const rows = normalizeList<MembershipFeeApiRow>(raw);
    return rows.map(mapRow).filter(Boolean) as MembershipFeeRow[];
  },
  async remove(id: string) {
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) throw new Error('Invalid membership fee id');

    const res = await fetch(`/api/membership-fees/${idNum}`, {
      method: 'DELETE',
      headers: {Accept: 'application/json'},
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.message ?? 'Failed to delete membership fee');
  },
};

export const membershipFeesRepo =
  env.dataMode === 'mock' ? mockRepo : apiRepo;
