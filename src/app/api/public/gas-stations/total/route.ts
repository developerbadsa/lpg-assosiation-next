import {NextResponse} from 'next/server';
import {laravelFetch, LaravelHttpError} from '@/lib/http/laravelFetch';

export const dynamic = 'force-dynamic';

type ApiStation = {
  id: number;
  station_name: string;
  station_owner_id?: number;
  verification_status?: string;
  location?: {
    division?: string | null;
    district?: string | null;
    upazila?: string | null;
  } | null;
};

type ApiStationResponse = {
  data?: ApiStation[];
};

export async function GET() {
  try {
    const [approved, pending] = await Promise.all([
      laravelFetch<ApiStationResponse>('/public/gas-stations/approved', {method: 'GET', auth: false}),
      laravelFetch<ApiStationResponse>('/public/gas-stations/pending', {method: 'GET', auth: false}),
    ]);

    const approvedData = approved?.data ?? [];
    const pendingData = pending?.data ?? [];

    return NextResponse.json({data: [...approvedData, ...pendingData]});
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      return NextResponse.json({message: e.message, errors: e.errors ?? null}, {status: e.status});
    }
    console.error(e);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
