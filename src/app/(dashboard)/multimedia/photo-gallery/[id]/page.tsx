import AlbumImagesSection from '@/features/dashboard/multimedia/photo-gallery/AlbumImagesSection';

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  return <AlbumImagesSection albumId={params.id} />;
}
