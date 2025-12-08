'use client';

import autogasLogo from '../../../assets/partner-logos/autogas.png';
import bashundharaLogo from '../../../assets/partner-logos/bashundaralp.png';
import bmlpgLogo from '../../../assets/partner-logos/bmlp.png';
import gftlLogo from '../../../assets/partner-logos/gftl.png';
import greenlpgLogo from '../../../assets/partner-logos/gftl.png';
import mrclLogo from '../../../assets/partner-logos/mrcl.png';
import orionLogo from '../../../assets/partner-logos/onion.png';
import soibalLogo from './../../../assets/partner-logos/soiballogo.png';

import {SectionHeading} from '../../ui/SectionHeading';
import {LogoCard, type LogoItem} from '../../ui/LogoCard';

const partners: LogoItem[] = [
   {name: 'Autogas', logo: autogasLogo},
   {name: 'Orion Gas', logo: orionLogo},
   {name: 'Green Fuel Technologies Ltd.', logo: gftlLogo},
   {name: 'Bashundhara LP Gas', logo: bashundharaLogo},
   {name: 'MRCL LPG', logo: mrclLogo},
   {name: 'BM LP Gas', logo: bmlpgLogo},
   {name: 'JMI Autogas', logo: soibalLogo},
   {name: 'Green LP Gas', logo: greenlpgLogo},
];

export default function OurPartnersSection() {
   return (
      <section className='relative w-full py-16'>
         <div className='pointer-events-none absolute inset-y-0 -left-30 hidden w-[430px] lg:block'>
            {/* green radial glow */}
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_#75B5534F,_transparent_90%)]' />
            {/* leaf image */}
            {/* <Image src={folio1} alt='' fill className='object-contain' /> */}
         </div>
         <div className='pointer-events-none absolute inset-y-0 -right-30 hidden w-[430px] lg:block'>
            {/* green radial glow */}
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_#75B5534F,_transparent_90%)]' />
            {/* leaf image */}
            {/* <Image src={folio1} alt='' fill className='object-contain' /> */}
         </div>

         {/* subtle center glow behind cards */}
         <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_#E1F4E880,_transparent_70%)]' />

         <div className='lpg-container relative'>
            <SectionHeading
               title='OUR PARTNERS'
               subtitle='Lorem ipsum dolor sit amet consectetur. Ultrices volutpat sollicitudin quis at in. In urna fermentum nunc sapien tortor.'
            />

            {/* cards wrapper */}
            <div className='mt-8 rounded-[26px]'>
               <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-4'>
                  {partners.map(partner => (
                     <LogoCard key={partner.name} {...partner} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
