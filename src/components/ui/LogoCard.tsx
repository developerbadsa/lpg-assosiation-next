import Image, { type StaticImageData } from 'next/image';

export type LogoItem = {
  name: string;
  logo: StaticImageData;
};

type LogoCardProps = LogoItem & {
  className?: string;
};

export function LogoCard({ name, logo, className }: LogoCardProps) {
  return (
    <div
      className={`flex h-[90px] items-center justify-center rounded-[14px] bg-white px-6 shadow-[0_18px_32px_rgba(0,0,0,0.12)] ${className ?? ''}`}
    >
      <Image
        src={logo}
        alt={name}
        width={140}
        height={60}
        className="object-contain"
      />
    </div>
  );
}
