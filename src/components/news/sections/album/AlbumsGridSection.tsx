'use client';

import Image from 'next/image';
import bgPattern from '@assets/wrappers/footer-bg-wrapper.png';
import AlbumCard, {type Album} from './AlbumCard';

import album1 from '@assets/newsfeed-img/gallery.png';
import album2 from '@assets/newsfeed-img/gallery.png';
import album3 from '@assets/newsfeed-img/gallery.png';
import SectionHeading from '@/components/ui/SectionHeading';

const albums: Album[] = [
   {
      id: 1,
      title: 'GENERAL MEETING',
      date: '8 APR, 2019',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album1,
   },
   {
      id: 2,
      title: 'GENERAL MEETING',
      date: '11 JAN, 2020',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album2,
   },
   {
      id: 3,
      title: 'GENERAL MEETING',
      date: '27 FEB, 2021',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album3,
   },
   {
      id: 4,
      title: 'RANGPUR GENERAL MEETING',
      date: '20 AUG, 2019',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album1,
   },
   {
      id: 5,
      title: 'BERC PUBLIC HEARING',
      date: '13 SEP, 2021',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album2,
   },
   {
      id: 6,
      title: 'GENERAL MEETING',
      date: '1 JANUARY, 2022',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album3,
   },
   {
      id: 7,
      title: 'PRESS XPRESS ROUNDTABLE',
      date: '8 JULY, 2019',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album1,
   },
      {
      id: 8,
      title: 'GENERAL MEETING',
      date: '1 JANUARY, 2022',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album3,
   },
   {
      id: 9,
      title: 'PRESS XPRESS ROUNDTABLE',
      date: '8 JULY, 2019',
      description:
         'Lorem ipsum dolor sit amet consectetur. Et sed elementum ut tellus euismod. Eleifend nullam.',
      image: album1,
   },
];

const AlbumsGridSection = () => {
   return (
      <section className='relative bg-[linear-gradient(180deg,#F6FCF7_0%,#EDF8F1_100%)] pb-16 pt-10 md:pb-24 md:pt-14'>
         {/* right-side geometric pattern */}

         <div className='lpg-container relative space-y-8 md:space-y-10'>
            {/* heading */}
            <div className='text-center'>
               <SectionHeading title='Our Albums' />
               <p className='mt-2 text-[13px] text-[#5A6B7B] md:text-[14px]'>
                  We are Largest one and only LPG Auto Gas Station &amp;
                  Conversion Workshop Owner&apos;s Association in Bangladesh.{' '}
                  <br className='hidden md:block' />
                  Welcome to our Gallery.
               </p>
            </div>

            {/* grid */}
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
               {albums.map(album => (
                  <AlbumCard key={album.id} album={album} />
               ))}
            </div>
         </div>
      </section>
   );
};

export default AlbumsGridSection;
