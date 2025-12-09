'use client';

import {useState} from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import stationIllustration from './img/why-choose-station.png';

type PillId = 'mission' | 'vision' | 'activities';
type ContentId = 'who' | PillId;

type PillItem = {
   id: PillId;
   label: string;
   accent?: boolean;
};

const PILL_ITEMS: PillItem[] = [
   {id: 'mission', label: 'OUR MISSION'},
   {id: 'vision', label: 'OUR VISION', accent: true},
   {id: 'activities', label: 'OUR ACTIVITIES'},
];

const CONTENT: Record<
   ContentId,
   {badge: string; heading: string; body: string}
> = {
   who: {
      badge: '?',
      heading: 'WHO ARE WE?',
      body: 'Lorem ipsum dolor sit amet consectetur. Sed facilisis ac blandit lorem sed tincidunt pellentesque. Lorem ipsum dolor sit amet consectetur amet dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
   },
   mission: {
      badge: 'M',
      heading: 'OUR MISSION',
      body: 'We work to ensure safe, reliable and sustainable LPG autogas usage across Bangladesh through strong regulations, modern infrastructure and member support.',
   },
   vision: {
      badge: 'V',
      heading: 'OUR VISION',
      body: 'To build a cleaner, greener future where LPG autogas is a trusted solution for transport and industry, reducing emissions and improving air quality nationwide.',
   },
   activities: {
      badge: 'A',
      heading: 'OUR ACTIVITIES',
      body: 'We arrange trainings, awareness programs, technical workshops and policy dialogues to help our members maintain world-class safety and service standards.',
   },
};

export default function WhyChooseUsSection() {
   const [hoveredId, setHoveredId] = useState<PillId | null>(null);

   const activeContent = CONTENT[hoveredId ?? 'who'];

   return (
      <section className='relative w-full py-16'>
         {/* light background glow */}
         <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#E1F4E880,_transparent_70%)]' />

         <div className='lpg-container relative bg-red-400'>
            <SectionHeading
               title='WHY CHOOSE US'
               subtitle='Lorem ipsum dolor sit amet consectetur. Urna ultrices amet ultrices sagittis leo in. In urna fermentum nunc sapien tortor.'
            />

            <div className='mt-10 flex gap-4 lg:gap-6   h-[570px]'>
               {/* LEFT: main card + dynamic content */}
               <div
                  className='relative w-[700px]
              overflow-hidden rounded-[15px]
              shadow-[0_22px_40px_rgba(0,0,0,0.22)]
            '>
                  <Image
                     src={stationIllustration}
                     alt='Modern LPG station illustration'
                     fill
                     priority
                     className='object-cover'
                  />

                  <div className='absolute inset-x-0 bottom-0 flex justify-between gap-6  pb-6 pt-5 w-full bg-[#22875ad0] px-4'>
                     <div className='w-full text-white'>
                        <div className='mb-2   flex w-full rounded-none'></div>
                        <div className='flex items-center gap-2'>
                           <div className='flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-white/10 text-[13px] font-semibold'>
                              {activeContent.badge}
                           </div>
                           <p className='text-[22px] font-bold uppercase tracking-[0.18em]'>
                              {activeContent.heading}
                           </p>
                        </div>

                        <p className='mt-3 text-[15px] leading-relaxed text-white/90'>
                           {activeContent.body}
                        </p>

                        <button
                           type='button'
                           className='
                    mt-4 inline-flex items-center gap-2
                    rounded-full border border-[#46FF5B66] bg-white/10 px-4 py-1.5
                    text-[11px] font-semibold uppercase tracking-[0.18em]
                    transition-colors hover:bg-white hover:text-[#009F6B]
                  '>
                           Learn more
                        </button>
                     </div>
                  </div>
               </div>

               {/* RIGHT: vertical pills */}
               <div className='flex h-full min-h-[280px] shrink-0 gap-3 flex-1'>
                  {PILL_ITEMS.map(pill => (
                     <div
                        key={pill.id}
                        onMouseEnter={() => setHoveredId(pill.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className='
                  relative flex h-full w-[145px] cursor-pointer items-center justify-center
                  overflow-hidden rounded-[26px]
                  bg-gradient-to-b from-[#00B06D] via-[#00A261] to-[#00894E]
                  shadow-[0_22px_36px_rgba(0,0,0,0.22)]
                '>
                        <div className='pointer-events-none absolute inset-[1px] rounded-[24px] bg-[linear-gradient(180deg,#16C17C33_0%,transparent_40%,#00693F66_100%)]' />

                        <div className='absolute top-5 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full bg-white/10 p-2'>
                           <span className='h-5 w-5 rounded-full border border-white/70 bg-white/20' />
                        </div>

                        <p
                           className='
                    relative
                    text-[11px] font-semibold tracking-[0.18em] text-white
                    [writing-mode:vertical-rl] rotate-180
                  '>
                           {pill.label}
                        </p>

                        {/* orange marker stays on the accent pill (middle), like Figma */}
                        {pill.accent && (
                           <div className='absolute left-[-10px] top-1/2 -translate-y-1/2'>
                              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#F15A29] shadow-[0_10px_22px_rgba(241,90,41,0.55)]'>
                                 <span className='h-2 w-2 rounded-full bg-white' />
                              </div>
                           </div>
                        )}

                        <div className='pointer-events-none absolute inset-y-0 right-[-40px] w-[80px] bg-[radial-gradient(circle_at_left,_#FFFFFF55,_transparent_70%)]' />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
