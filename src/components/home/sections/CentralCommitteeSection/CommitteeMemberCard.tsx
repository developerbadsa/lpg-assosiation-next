import Image from 'next/image';
import type {CommitteeMember} from './index';

export default function CommitteeMemberCard({
   member,
}: {
   member: CommitteeMember;
}) {
   return (
      <article className='relative flex h-full flex-col rounded-[22px] border border-[#E3EAF6] bg-white px-6 pb-7 pt-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)]'>
         {/* role */}
         <p className='text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00A651]'>
            {member.role}
         </p>

         {/* photo */}
         <div className='mt-4 flex justify-center'>
            <div className='flex h-[118px] w-[118px] items-center justify-center rounded-full border-[4px] border-[#7AD143] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.22)]'>
               <div className='relative h-[96px] w-[96px] overflow-hidden rounded-full bg-white'>
                  <Image
                     src={member.photo}
                     alt={member.name}
                     fill
                     className='object-cover'
                  />
               </div>
            </div>
         </div>

         {/* name + description */}
         <div className='mt-5 text-center'>
            <h3 className='text-[12px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#203566]'>
               {member.name}
            </h3>

            <div className='mt-3 space-y-1 text-[11px] leading-snug text-[#5F6F85]'>
               {member.descriptionLines.map(line => (
                  <div key={line}>{line}</div>
               ))}
            </div>
         </div>

         {/* social icons row */}
         <div className='mt-5 flex justify-center gap-3'>
            {member.socials.map(social => (
               <a
                  key={social.kind}
                  href={social.href}
                  aria-label={social.kind}
                  className='flex h-7 w-7 items-center justify-center rounded-full border border-[#E3EAF6] bg-white text-[#00A651] shadow-[0_6px_14px_rgba(0,0,0,0.12)]'>
                  <Image
                     src={`/icons/social-${social.kind}.svg`} // put icons in public/icons
                     alt={social.kind}
                     width={14}
                     height={14}
                     className='object-contain'
                  />
               </a>
            ))}
         </div>
      </article>
   );
}
