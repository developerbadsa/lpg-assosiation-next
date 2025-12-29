import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

const BASE = process.env.API_BASE_URL;
const TOKEN_NAME = process.env.AUTH_TOKEN_COOKIE ?? 'lpg_token';

if (!BASE) throw new Error('Missing env: API_BASE_URL');

function buildUrl(req: Request, pathParts: string[]) {
  const reqUrl = new URL(req.url);
  const target = new URL(`${BASE}/${pathParts.join('/')}`);
  // keep query string (?page=1 etc.)
  target.search = reqUrl.search;
  return target.toString();
}

async function forward(req: Request, pathParts: string[]) {
  const token = (await cookies()).get(TOKEN_NAME)?.value ?? null;

  const url = buildUrl(req, pathParts);
  const contentType = req.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  let body: BodyInit | undefined = undefined;

  // IMPORTANT:
  // - For JSON: read json and re-stringify
  // - For FormData: read formData and forward as-is (DON'T set content-type)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (isJson) {
      const json = await req.json().catch(() => null);
      body = json ? JSON.stringify(json) : undefined;
    } else if (contentType.includes('multipart/form-data')) {
      const fd = await req.formData();
      body = fd as any;
    } else {
      // fallback for text / urlencoded
      body = await req.text();
    }
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // only set JSON content-type if we are sending JSON
  if (isJson && body) headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
    cache: 'no-store',
  });

  const resType = res.headers.get('content-type') ?? '';
  if (resType.includes('application/json')) {
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status });
  }

  const text = await res.text().catch(() => '');
  return new NextResponse(text, { status: res.status });
}

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}
export async function POST(req: Request, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}
export async function PUT(req: Request, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}
export async function PATCH(req: Request, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}
export async function DELETE(req: Request, { params }: { params: { path: string[] } }) {
  return forward(req, params.path);
}
