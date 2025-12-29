type ClientOpts = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
};

export async function apiClient<T>(path: string, opts: ClientOpts = {}): Promise<T> {
  const url = `/api/backend${path.startsWith('/') ? '' : '/'}${path}`;

  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: 'no-store',
    credentials: 'include',
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw { status: res.status, data };
  return data as T;
}
