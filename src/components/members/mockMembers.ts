export type Member = {
  sl: number;
  photoUrl: string;
  ownerName: string;
  memberId: string;
  stations: string[];
  zone: string;
  district: string;
  upazila: string;
};

const OWNER_NAMES = [
  'Engr. Md. Serajul Mawla',
  'Engr. Md. Serajul Mawla',
  'Engr. Md. Serajul Mawla',
  'Engr. Md. Serajul Mawla',
];

const STATIONS_POOL: string[][] = [
  // first style (multi line like screenshot)
  ['Saad Motors', 'MIS Aladhin Filling Station', 'Saad Motors LPG Autogas Station', 'SS LPG Autogas Filling Station'],
  // single line styles
  ['Saad Motors'],
  ['Green LPG Auto Gas'],
  ['Orion LPG Station'],
  ['A Rahman & sons'],
];

const ZONES = ['Rajshahi', 'Barisal', 'Dhaka', 'Chattogram', 'Khulna', 'Sylhet', 'Rangpur', 'Mymensingh'];
const DISTRICTS = ['Rajshahi', 'Barisal', 'Dhaka', 'Chattogram', 'Khulna', 'Sylhet'];
const UPAZILAS = ['Paba', 'Barisal Sadar', 'Kotwali', 'Pahartali', 'Sonadanga', 'South Surma'];

function makeMemberId(sl: number) {
  // screenshot-like numeric id (ex: 21020111)
  return String(21020111 + sl - 1);
}

export const MOCK_MEMBERS: Member[] = Array.from({ length: 395 }, (_, idx) => {
  const sl = idx + 1;

  // Make row-1 multi-station like screenshot, then mostly single-station
  const stations = idx === 0 ? STATIONS_POOL[0] : STATIONS_POOL[1 + (idx % (STATIONS_POOL.length - 1))];

  const zone = ZONES[idx % ZONES.length];
  const district = DISTRICTS[idx % DISTRICTS.length];
  const upazila = UPAZILAS[idx % UPAZILAS.length];

  return {
    sl,
    photoUrl: `https://i.pravatar.cc/80?img=${(idx % 70) + 1}`,
    ownerName: OWNER_NAMES[idx % OWNER_NAMES.length],
    memberId: makeMemberId(sl),
    stations,
    zone,
    district,
    upazila,
  };
});
