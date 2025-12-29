'use client';

import {CloudUpload} from 'lucide-react';
import {useEffect, useState} from 'react';

import MediaCard from '@/components/ui/media/MediaCard';
import Modal from '@/components/ui/modal/Modal';
import {normalizeList} from '@/lib/http/normalize';
import {toAbsoluteUrl} from '@/lib/http/url';

type VideoApiRow = {
  id: number | string;
  title?: string | null;
  youtube_link?: string | null;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  thumbnail_path?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type VideoItem = {
  id: number;
  title: string;
  dateText: string;
  thumbnail: string | any;
  youtubeLink: string;
};

function normalizeUrl(v?: string) {
  const t = (v ?? '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function formatDateLite(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getYouTubeId(url?: string | null) {
  const u = (url ?? '').trim();
  if (!u) return '';

  // youtu.be/<id>
  const m1 = u.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/i);
  if (m1?.[1]) return m1[1];

  // watch?v=<id>
  const m2 = u.match(/[?&]v=([A-Za-z0-9_-]{6,})/i);
  if (m2?.[1]) return m2[1];

  // /embed/<id> or /shorts/<id>
  const m3 = u.match(/\/(embed|shorts)\/([A-Za-z0-9_-]{6,})/i);
  if (m3?.[2]) return m3[2];

  return '';
}

function youtubeThumbFromLink(link?: string | null) {
  const id = getYouTubeId(link);
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function youtubeEmbedFromLink(link?: string | null) {
  const id = getYouTubeId(link);
  if (!id) return '';
  return `https://www.youtube.com/embed/${id}`;
}

function mapRow(r: VideoApiRow): VideoItem | null {
  const id = Number(r.id);
  if (!Number.isFinite(id)) return null;

  const origin =
    process.env.NEXT_PUBLIC_LARAVEL_ORIGIN ?? 'https://admin.petroleumstationbd.com';

  const rel =
    r.thumbnail ?? (r as any).thumbnail_url ?? (r as any).thumbnail_path ?? '';

  const apiThumb = rel ? toAbsoluteUrl(origin, rel) : '';
  const youtubeLink = normalizeUrl(r.youtube_link ?? '');
  const fallbackThumb = youtubeThumbFromLink(youtubeLink);

  const title = (r.title ?? '').trim() || `Video #${id}`;
  const dateText = formatDateLite(r.created_at ?? r.updated_at) || '';

  return {
    id,
    title,
    dateText,
    thumbnail: apiThumb || fallbackThumb, // ✅ fixes broken thumbnail
    youtubeLink,
  };
}

function isImageFile(f: File) {
  return ['image/png', 'image/jpeg', 'image/webp'].includes(f.type);
}

export default function VideoGallerySection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<VideoItem | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<VideoItem | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/videos', {
        method: 'GET',
        cache: 'no-store',
        headers: {Accept: 'application/json'},
      });

      const raw = await res.json().catch(() => null);
      if (!res.ok) return;

      const rows = normalizeList<VideoApiRow>(raw);
      const next = rows.map(mapRow).filter(Boolean) as VideoItem[];
      setVideos(next);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onDelete = async (id: number) => {
    if (!Number.isFinite(id)) {
      window.alert('Invalid video id');
      return;
    }

    const ok = window.confirm('Remove this video?');
    if (!ok) return;

    const snapshot = videos;
    setVideos((p) => p.filter((x) => x.id !== id));

    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        headers: {Accept: 'application/json'},
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setVideos(snapshot);
        window.alert(data?.message ?? 'Failed to delete video');
      }
    } catch {
      setVideos(snapshot);
      window.alert('Network error. Please try again.');
    }
  };

  return (
    <section>
      {/* header row (title centered + button right) */}
      <div className='relative flex items-center justify-center'>
        <h2 className='text-[14px] font-medium text-[#173A7A]'>Video Gallery</h2>

        <button
          type='button'
          className='absolute right-0 inline-flex h-8 items-center gap-2 rounded-[6px] bg-[#009970] px-4 text-[11px] font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95'
          onClick={() => setAddOpen(true)}
        >
          <CloudUpload size={14} />
          Ad Video
        </button>
      </div>

      {/* grid */}
      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {videos.map((v) => (
          <MediaCard
            key={v.id}
            variant='video'
            title={v.title}
            dateText={v.dateText}
            thumbnail={v.thumbnail}
            onView={() => {
              setViewItem(v);
              setViewOpen(true);
            }}
            onEdit={() => {
              setEditItem(v);
              setEditOpen(true);
            }}
            onDelete={() => onDelete(v.id)}
          />
        ))}
      </div>

      {!loading && videos.length === 0 && (
        <p className='mt-8 text-center text-[12px] text-[#7B8EA3]'>No videos found.</p>
      )}

      <AddVideoModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={async () => {
          setAddOpen(false);
          await load();
        }}
      />

      <ViewVideoModal
        open={viewOpen}
        item={viewItem}
        onClose={() => {
          setViewOpen(false);
          setViewItem(null);
        }}
      />

      <EditVideoModal
        open={editOpen}
        item={editItem}
        onClose={() => {
          setEditOpen(false);
          setEditItem(null);
        }}
        onUpdated={async () => {
          setEditOpen(false);
          setEditItem(null);
          await load();
        }}
      />
    </section>
  );
}

function AddVideoModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [thumb, setThumb] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setYoutubeLink('');
    setThumb(null);
    setSaving(false);
    setErr('');
  }, [open]);

  const submit = async () => {
    setErr('');

    if (!title.trim()) return setErr('Title is required');
    const link = normalizeUrl(youtubeLink);
    if (!link) return setErr('YouTube link is required');

    const fd = new FormData();
    fd.set('title', title.trim());
    fd.set('youtube_link', link);

    if (thumb) {
      if (!isImageFile(thumb)) return setErr('Thumbnail must be PNG/JPG/WEBP');
      fd.set('thumbnail', thumb);
    }

    setSaving(true);
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: {Accept: 'application/json'},
        body: fd,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErr(data?.message ?? 'Failed to create video');
        return;
      }

      await onCreated();
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} title='Add Video' onClose={onClose} maxWidthClassName='max-w-[560px]'>
      <div className='p-4'>
        <div className='space-y-3'>
          <div>
            <label className='mb-1 block text-[11px] font-semibold text-[#173A7A]'>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='h-9 w-full rounded-[6px] border border-black/10 px-3 text-[12px] outline-none focus:border-black/20'
              placeholder='Video title'
            />
          </div>

          <div>
            <label className='mb-1 block text-[11px] font-semibold text-[#173A7A]'>YouTube link</label>
            <input
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className='h-9 w-full rounded-[6px] border border-black/10 px-3 text-[12px] outline-none focus:border-black/20'
              placeholder='https://www.youtube.com/watch?v=...'
            />
          </div>

          <div>
            <label className='mb-1 block text-[11px] font-semibold text-[#173A7A]'>
              Thumbnail (optional)
            </label>
            <input
              type='file'
              accept='image/png,image/jpeg,image/webp'
              onChange={(e) => setThumb(e.target.files?.[0] ?? null)}
              className='block w-full text-[12px]'
            />
          </div>

          {err && <p className='text-[12px] font-medium text-red-600'>{err}</p>}

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              disabled={saving}
              className='h-9 rounded-[6px] border border-black/10 px-4 text-[12px] font-semibold text-[#173A7A] hover:bg-black/5 disabled:opacity-60'
            >
              Cancel
            </button>

            <button
              type='button'
              onClick={submit}
              disabled={saving}
              className='h-9 rounded-[6px] bg-[#009970] px-4 text-[12px] font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95 disabled:opacity-60'
            >
              {saving ? 'Saving...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ViewVideoModal({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: VideoItem | null;
  onClose: () => void;
}) {
  const embed = youtubeEmbedFromLink(item?.youtubeLink);

  return (
    <Modal open={open} title={item?.title ?? 'View Video'} onClose={onClose} maxWidthClassName='max-w-[900px]'>
      <div className='p-4'>
        {!embed ? (
          <p className='text-[12px] text-red-600'>Invalid YouTube link.</p>
        ) : (
          <div className='relative w-full overflow-hidden rounded-[8px] bg-black'>
            <div className='relative aspect-video w-full'>
              <iframe
                className='absolute inset-0 h-full w-full'
                src={embed}
                title={item?.title ?? 'Video'}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function EditVideoModal({
  open,
  item,
  onClose,
  onUpdated,
}: {
  open: boolean;
  item: VideoItem | null;
  onClose: () => void;
  onUpdated: () => void | Promise<void>;
}) {
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [thumb, setThumb] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!open) return;
    setTitle(item?.title ?? '');
    setYoutubeLink(item?.youtubeLink ?? '');
    setThumb(null);
    setSaving(false);
    setErr('');
  }, [open, item]);

  const submit = async () => {
    setErr('');
    const id = item?.id;

    if (!Number.isFinite(id)) return setErr('Invalid video id');
    if (!title.trim()) return setErr('Title is required');

    const link = normalizeUrl(youtubeLink);
    if (!link) return setErr('YouTube link is required');

    const fd = new FormData();
    fd.set('title', title.trim());
    fd.set('youtube_link', link);

    if (thumb) {
      if (!isImageFile(thumb)) return setErr('Thumbnail must be PNG/JPG/WEBP');
      fd.set('thumbnail', thumb);
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'POST', // update via _method=PUT inside API route
        headers: {Accept: 'application/json'},
        body: fd,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErr(data?.message ?? 'Failed to update video');
        return;
      }

      await onUpdated();
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} title='Edit Video' onClose={onClose} maxWidthClassName='max-w-[560px]'>
      <div className='p-4'>
        <div className='space-y-3'>
          <div>
            <label className='mb-1 block text-[11px] font-semibold text-[#173A7A]'>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='h-9 w-full rounded-[6px] border border-black/10 px-3 text-[12px] outline-none focus:border-black/20'
              placeholder='Video title'
            />
          </div>

          <div>
            <label className='mb-1 block text-[11px] font-semibold text-[#173A7A]'>YouTube link</label>
            <input
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className='h-9 w-full rounded-[6px] border border-black/10 px-3 text-[12px] outline-none focus:border-black/20'
              placeholder='https://www.youtube.com/watch?v=...'
            />
          </div>

          <div>
            <label className='mb-1 block text-[11px] font-semibold text-[#173A7A]'>
              Thumbnail (optional)
            </label>
            <input
              type='file'
              accept='image/png,image/jpeg,image/webp'
              onChange={(e) => setThumb(e.target.files?.[0] ?? null)}
              className='block w-full text-[12px]'
            />
          </div>

          {err && <p className='text-[12px] font-medium text-red-600'>{err}</p>}

          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              disabled={saving}
              className='h-9 rounded-[6px] border border-black/10 px-4 text-[12px] font-semibold text-[#173A7A] hover:bg-black/5 disabled:opacity-60'
            >
              Cancel
            </button>

            <button
              type='button'
              onClick={submit}
              disabled={saving}
              className='h-9 rounded-[6px] bg-[#009970] px-4 text-[12px] font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95 disabled:opacity-60'
            >
              {saving ? 'Saving...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
