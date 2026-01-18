'use client';

import ContactInfoCard from './ContactInfoCard';
import type {ContactItem} from './ContactInfoCard';

import callIcon from './img/call.png';
import locationIcon from './img/location.png';
import emailIcon from './img/email.png';
import personIcon from './img/person.png';

import ContactFormPanel from './ContactFormPanel';

const CONTACT_ITEMS: ContactItem[] = [
   {
      id: 'org-name-en',
      type: 'person',
      label: 'ORGANIZATION NAME:',
      value: 'Bangladesh Petroleum Dealer’s, Distributor’s Agent’s & Petrol Pump Owner’s Association',
      img: personIcon,
   },
   {
      id: 'address-primary',
      type: 'location',
      label: 'ADDRESS:',
      value: 'Gulfesha Plaza, Left-10, Suite No-10/O, 69 Outer Circular Rd, MoghBazar Mor, Dhaka 1217',
      img: locationIcon,
   },
   {
      id: 'phone',
      type: 'phone',
      label: 'PHONE:',
      value: '+8801730-178288, +8801615-851373, +8801711-534142',
      img: callIcon,
   },
   {
      id: 'email',
      type: 'email',
      label: 'EMAIL:',
      value: 'info@petroleumstationbd.com',
      img: emailIcon,
   },
];

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.1171634984759!2d90.36402001694142!3d23.823057261836247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1537ad6db0b%3A0xeb18825a81ff97e0!2s2%2C%202%20Pallabi%20Rd%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1768222304153!5m2!1sen!2sbd';


export default function ContactUsWithForm() {
   return (
      <div className='relative w-full py-16'>
         <div className='mt-10 grid gap-6 lg:grid-cols-[440px_minmax(0,1fr)]'>
            {/* LEFT: contact cards */}
            <div className='flex flex-col gap-5'>
               {CONTACT_ITEMS.map(item => (
                  <ContactInfoCard key={item.id} item={item} />
               ))}
            </div>

            {/* RIGHT: map + form, extracted */}
            <ContactFormPanel mapUrl={MAP_EMBED_URL} />
         </div>
      </div>
   );
}
