import {NextResponse} from 'next/server';
import {laravelFetch, LaravelHttpError} from '@/lib/http/laravelFetch';

// Admin list (auth required)
export async function GET() {
  try {
    const data = await laravelFetch('/contact-messages', {method: 'GET', auth: true});
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      return NextResponse.json({message: e.message, errors: e.errors}, {status: e.status});
    }
    return NextResponse.json({message: 'Server error'}, {status: 500});
  }
}

// Public send message (no auth) - useful for Contact page
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await laravelFetch('/contact-messages', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      return NextResponse.json({message: e.message, errors: e.errors}, {status: e.status});
    }
    return NextResponse.json({message: 'Server error'}, {status: 500});
  }
}
