'use client';

import Image from 'next/image';
import {Calendar, Eye, Pencil, Play, Trash2} from 'lucide-react';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

type Props = {
  title: string;
  dateText?: string;

  /** thumbnail can be url string or StaticImageData */
  thumbnail: string | any;

  variant?: 'video' | 'photo'; // video shows play overlay
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;

  className?: string;
};

export default function MediaCard({
  title,
  dateText,
  thumbnail,
  variant = 'video',
  onView,
  onEdit,
  onDelete,
  className,
}: Props) {
  return (
    <div
      className={cx(
        'overflow-hidden rounded-[10px] bg-white',
        'shadow-[0_18px_45px_rgba(0,0,0,0.14)]',
        className
      )}
    >
      <div className='relative aspect-[16/9] w-full bg-slate-100'>
        <Image
          src={thumbnail}
          alt={title}
          fill
          className='object-cover'
          sizes='(max-width: 1024px) 50vw, 25vw'
          priority={false}
        />

        {variant === 'video' && (
          <button
            type='button'
            aria-label='Play video'
            onClick={(e) => {
              e.stopPropagation();
              onView?.();
            }}
            className='absolute inset-0 grid place-items-center'
          >
            <span className='grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow-sm'>
              <Play size={18} className='translate-x-[1px] text-slate-700' />
            </span>
          </button>
        )}
      </div>

      <div className='bg-[#F4F7FB] px-4 pb-3 pt-3'>
        <div className='text-[10px] font-extrabold uppercase leading-4 text-[#173A7A]'>
          {title}
        </div>

        {dateText ? (
          <div className='mt-1 flex items-center gap-2 text-[10px] text-slate-500'>
            <Calendar size={12} />
            <span>{dateText}</span>
          </div>
        ) : null}

        <div className='mt-3 flex items-center justify-center gap-2'>
          <IconCircle
            ariaLabel='View'
            onClick={onView}
            className='bg-[#2E6BFF]'
            icon={<Eye size={14} className='text-white' />}
          />
          <IconCircle
            ariaLabel='Edit'
            onClick={onEdit}
            className='bg-[#26B35B]'
            icon={<Pencil size={14} className='text-white' />}
          />
          <IconCircle
            ariaLabel='Delete'
            onClick={onDelete}
            className='bg-[#E74C3C]'
            icon={<Trash2 size={14} className='text-white' />}
          />
        </div>
      </div>
    </div>
  );
}

function IconCircle({
  icon,
  className,
  onClick,
  ariaLabel,
}: {
  icon: React.ReactNode;
  className: string;
  onClick?: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      onClick={onClick}
      className={cx(
        'grid h-8 w-8 place-items-center rounded-full shadow-sm',
        'hover:brightness-110 active:brightness-95',
        className
      )}
    >
      {icon}
    </button>
  );
}
