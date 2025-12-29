import {NextResponse} from 'next/server';
import {laravelFetch, LaravelHttpError} from '@/lib/http/laravelFetch';

export async function DELETE(_: Request, ctx: {params: {id: string}}) {
  try {
    await laravelFetch(`/contact-messages/${ctx.params.id}`, {method: 'DELETE', auth: true});
    return NextResponse.json({ok: true});
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      return NextResponse.json({message: e.message, errors: e.errors}, {status: e.status});
    }
    return NextResponse.json({message: 'Server error'}, {status: 500});
  }
}