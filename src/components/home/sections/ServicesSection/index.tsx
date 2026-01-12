'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import {ServiceCard, type ServiceItem} from './ServiceCard';
import {
   DollarStack,
   InterestIcon,
   LpgIcon,
   LpgStation,
} from '@/assets/ui-icons/svgs/ServiceIcon';

const SERVICES: ServiceItem[] = [
   {
      id: 'Regulatory Guidance',
      title: 'Regulatory Guidance',
      Icon: DollarStack,
      description:
         'We provide updated information, interpretations, and guidance on government rules and regulations related to petroleum trading, licensing, safety standards, and taxation. Buying and selling price is fix by the government.',
   },
   {
      id: 'Largest Petrol Pump Owners Chain Management',
      title: 'Largest Petrol Pump Owners Chain Management',
      Icon: InterestIcon,
      description:
         'The largest Petrol pump owners’ chain across Bangladesh, supporting dealers and partners with centralized logistics, training, and performance monitoring.',
   },
   {
      id: 'FILLING STATION MANAGEMENT',
      title: 'FILLING STATION MANAGEMENT',
      Icon: LpgIcon,
      description:
         'Filling stations are audited and managed under strict guidelines to ensure 24/7 service, safety compliance, and up to customer satisfactio',
   },
   {
      id: 'Petrol/Diesel/Octane/Kerosene/ Lube Oil BUSINESS ',
      title: 'Petrol/Diesel/Octane/Kerosene/ Lube Oil BUSINESS ',
      Icon: LpgStation,
      description:
         'Providing reliable supply, safe distribution, and professional support for petrol pumps, dealers, and agents across Bangladesh, ensuring quality products, regulatory compliance, and sustainable business growth.',
   },
];

export default function ServicesSection() {
   return (
      <section className='relative w-full py-2 md:py-16 '>
         {/* soft background glow & dots */}
         <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#E4F5FF80,_transparent_65%)]' />
         {/* <div
  className="
    pointer-events-none absolute top-24 h-32 w-32 rounded-full
    border border-[#16B55B1A]
    bg-[radial-gradient(circle,_#16B55B26,_transparent_70%)]

  "
/> */}

         <div className='pointer-events-none absolute left-6 bottom-10 h-24 w-24 rounded-full border border-[#16B55B0F]' />

         <div className='lpg-container relative'>
            <SectionHeading
               title='SERVICES'
               subtitle='Our main focus is to build Members’ Chain and Channel Support that together ensure safe and efficient nationwide activities in Petrol, Diesel & Octane with quality 24/7 service.'
            />

            <div className='mt-10 grid gap-12 md:grid-cols-2'>
               {SERVICES.map(item => (
                  <ServiceCard key={item.id} item={item} />
               ))}
            </div>
         </div>
      </section>
   );
}
