'use client';
import SectionHeading from './../../../ui/SectionHeading';
import ContactUsWithForm from './../../../shared/ContactSectionWithForm/index';

export default function ContactUsSection() {
   return (
      <section className='relative w-full py-16'>
         {/* soft top glow */}
         <div className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,#E4F5FF80,_transparent_70%)]' />
         {/* right-side dots */}
         <div className='pointer-events-none absolute right-10 top-52 h-40 w-8 bg-[radial-gradient(circle,#D7E4F5_1.5px,transparent_1.5px)] bg-[length:10px_10px] opacity-80' />

         <div className='lpg-container relative'>
            <SectionHeading
               title='CONTACT US'
               subtitle='Have questions or need assistance? Our team is here to help. Reach out to us anytime for quick, friendly, and reliable support.'
            />

            {/* <div className="mt-10 grid gap-6 lg:grid-cols-[440px_minmax(0,1fr)]">
    
          <div className="flex flex-col gap-5">
            {CONTACT_ITEMS.map(item => (
              <ContactInfoCard key={item.id} item={item} />
            ))}
          </div>

          <ContactFormPanel mapUrl={MAP_EMBED_URL} />
        </div> */}

            <ContactUsWithForm />
         </div>
      </section>
   );
}

// <div className="lpg-container relative">
//   <SectionHeading
//     title="CONTACT US"
//     subtitle="Have questions or need assistance? Our team is here to help. Reach out to us anytime for quick, friendly, and reliable support."
//   />

//   <div className="mt-10 grid gap-6 lg:grid-cols-[440px_minmax(0,1fr)]">

//     <div className="flex flex-col gap-5">
//       {CONTACT_ITEMS.map(item => (
//         <ContactInfoCard key={item.id} item={item} />
//       ))}
//     </div>

//     <ContactFormPanel mapUrl={MAP_EMBED_URL} />
//   </div>
// </div>
