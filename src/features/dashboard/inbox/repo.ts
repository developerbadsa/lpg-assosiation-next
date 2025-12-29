import type {InboxMessage} from './types';

type ContactMessageApi = {
  id: number;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  subject: string;
  message: string;
  created_at?: string;
};

function avatarUrlFor(name: string) {
  // Simple, stable avatar source
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=E2E8F0&color=0F172A`;
}

function formatTimeLabel(iso?: string) {
  if (!iso) return '—';
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;

  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'Now';

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hours ago`;

  const day = Math.floor(hr / 24);
  return `${day} days ago`;
}

function normalizeList(raw: any): ContactMessageApi[] {
  if (Array.isArray(raw)) return raw as ContactMessageApi[];
  if (Array.isArray(raw?.data)) return raw.data as ContactMessageApi[];
  return [];
}

async function readJsonOrThrow(res: Response) {
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? 'Request failed');
  return data;
}

export const inboxRepo = {
  async list(): Promise<InboxMessage[]> {
    const res = await fetch('/api/contact-messages', {cache: 'no-store'});
    const raw = await readJsonOrThrow(res);

    const list = normalizeList(raw);

    return list.map((m) => ({
      id: m.id,
      name: m.sender_name,
      email: m.sender_email,
      phone: m.sender_phone,
      subject: m.subject,
      message: m.message,
      timeLabel: formatTimeLabel(m.created_at),
      avatarUrl: avatarUrlFor(m.sender_name),
    }));
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`/api/contact-messages/${id}`, {method: 'DELETE'});
    await readJsonOrThrow(res);
  },
};
