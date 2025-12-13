import Image, { type StaticImageData } from 'next/image';

export type Album = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: StaticImageData;
};

type AlbumCardProps = {
  album: Album;
};

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
      {/* top image */}
      <div className="relative h-[185px] w-full md:h-[200px]">
        <Image
          src={album.image}
          alt={album.title}
          fill
          className="object-cover"
        />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-1 px-4 pb-5 pt-4 md:px-5 md:pb-6 md:pt-5 ">
        <h3 className="text-[22px] font-bold uppercase tracking-[0.0em] md:text-[14px]">
          {album.title}
        </h3>

        <p className="text-[11px] font-medium uppercase tracking-[0.10em] opacity-40">
          {album.date}
        </p>

        <p className="mt-1 text-[13px] leading-[16px]  opacity-70 font-light">
          {album.description}
        </p>
      </div>

      {/* green edge highlight (top + border glow) */}
      <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-[#E3EDF5] ">
        <div className="h-[3px] w-full rounded-t-[18px] bg-[#6CC12A]" />
      </div>

      {/* hover elevation */}
      <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-transparent transition-all duration-200 group-hover:border-[#6CC12A]/70 group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.18)]" />
    </article>
  );
};

export default AlbumCard;
