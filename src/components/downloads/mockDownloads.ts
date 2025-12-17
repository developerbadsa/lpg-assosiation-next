export type DownloadRow = {
  sl: number;
  title: string;
  publishedDate: string; // screenshot looks like an ID/code, so keep string
  viewUrl?: string;
  downloadUrl?: string;
};

export const TOTAL_MEMBERS = 928;

export const MOCK_DOWNLOADS: DownloadRow[] = [
  {
    sl: 1,
    title: 'Modina LPG Gas Station & Conversion Center',
    publishedDate: '14906-5837',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    sl: 2,
    title: 'Faridpur LPG Autogas Filling Station',
    publishedDate: '80362-1779',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    sl: 3,
    title: 'Baraka LPG & Filling Station',
    publishedDate: '53913-6773',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    sl: 4,
    title: 'Sheikh Saad LPG Auto gas Filling Station',
    publishedDate: '74806-4981',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    sl: 5,
    title: 'Ashohtalhi Filling Station',
    publishedDate: '74806-4981',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {
    sl: 6,
    title: 'A Rahman & sons',
    publishedDate: '74806-4981',
    viewUrl: '#',
    downloadUrl: '#',
  },
  {sl: 7, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '06715', viewUrl: '#', downloadUrl: '#'},
  {sl: 8, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '45238-9729', viewUrl: '#', downloadUrl: '#'},
  {sl: 9, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '25729', viewUrl: '#', downloadUrl: '#'},
  {sl: 10, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '211002', viewUrl: '#', downloadUrl: '#'},
  {sl: 11, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '10455-8821', viewUrl: '#', downloadUrl: '#'},
  {sl: 12, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '90881-1129', viewUrl: '#', downloadUrl: '#'},
  {sl: 13, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '51093-7734', viewUrl: '#', downloadUrl: '#'},
  {sl: 14, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '77510-3309', viewUrl: '#', downloadUrl: '#'},
  {sl: 15, title: 'Lorem ipsum dolor sit amet consectetur.', publishedDate: '66001-9180', viewUrl: '#', downloadUrl: '#'},
];
