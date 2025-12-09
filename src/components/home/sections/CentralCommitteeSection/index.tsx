'use client';

import Image, { type StaticImageData } from 'next/image';
import SectionHeading from '@components/ui/SectionHeading';

import leaderImg1 from '@assets/leader-img/md-serajul-mawla.png';
import leaderImg2 from '@assets/leader-img/hasin-parfez.png';

type SocialKind = 'facebook' | 'twitter' | 'linkedin' | 'globe';

type CommitteeMember = {
  id: string;
  role: string;
  name: string;
  descriptionLines: string[];
  photo: StaticImageData;
  socials: { kind: SocialKind; href: string }[];
};

const committeeMembers: CommitteeMember[] = [
  {
    id: 'president-1',
    role: 'PRESIDENT',
    name: 'ENGR. MOHAMMAD SERAJUL MAWLA',
    descriptionLines: [
      'Managing Director, Saad Motors Ltd.',
      'Managing Director, SMT Energy Ltd.',
    ],
    photo: leaderImg1,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'vp-1',
    role: 'VICE PRESIDENT',
    name: 'ABDULLAH AL KAFEE',
    descriptionLines: ['Proprietor, Shefaat Fuel Station'],
    photo: leaderImg2,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'vp-2',
    role: 'VICE PRESIDENT',
    name: 'KRISHNA KANTA DAS',
    descriptionLines: [
      'Proprietor, K.T. Service Station',
      '& LPG Conversion Center',
    ],
    photo: leaderImg1,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'vp-3',
    role: 'VICE PRESIDENT',
    name: 'T MASHFU BOBBY',
    descriptionLines: ['Managing Director, Super Gas Ltd.'],
    photo: leaderImg2,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'vp-4',
    role: 'VICE PRESIDENT',
    name: 'MD. ABDUS SABUR REA',
    descriptionLines: ['Proprietor, Sabur Auto Filling Station'],
    photo: leaderImg1,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'vp-5',
    role: 'VICE PRESIDENT',
    name: 'MD. EMAMUL HASAN',
    descriptionLines: ['Proprietor, Samiron LPG Filling Station'],
    photo: leaderImg2,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'vp-6',
    role: 'VICE PRESIDENT',
    name: 'SAYEDA AKTER',
    descriptionLines: [
      'Proprietor, Green LP Gas Autogas Filling Station & Conversions',
    ],
    photo: leaderImg1,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  {
    id: 'gs-1',
    role: 'GENERAL SECRETARY',
    name: 'MD. HASIN PARVEZ',
    descriptionLines: ['CEO, Green Fuel Technologies Ltd.'],
    photo: leaderImg2,
    socials: [
      { kind: 'facebook', href: '#' },
      { kind: 'twitter', href: '#' },
      { kind: 'linkedin', href: '#' },
      { kind: 'globe', href: '#' },
    ],
  },
  // add more members as needed...
];

export default function CentralCommitteeSection() {
  return (
    <section className="relative bg-[#F4F9F4] py-16">
      {/* side background glows */}
      <div className="pointer-events-none absolute -left-24 top-[120px] h-[260px] w-[260px] rounded-[40px] bg-[radial-gradient(circle_at_center,_#D5E6FF66,_transparent_70%)]" />
      <div className="pointer-events-none absolute right-[-40px] bottom-[80px] h-[260px] w-[260px] rounded-[40px] bg-[radial-gradient(circle_at_center,_#E1F4E880,_transparent_70%)]" />

      <div className="lpg-container relative">
        <SectionHeading
          title="CENTRAL COMMITTEE"
          subtitle="The current committee has been formed in a general meeting held on 27 February, 2021. About 200 owners of autogas stations and conversion workshops were present at the meeting chaired by Engr. Mohammad Serajul Mawla. The panel of Engr. Mohammad Serajul Mawla and SMT Energy Ltd. was elected to the present committee. The following panel members are playing important roles in promoting LPG Autogas and LPG Conversion Center across the country as the General Secretary of this association."
        />

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {committeeMembers.map((member) => (
            <CommitteeMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  return (
    <article className="relative flex h-full flex-col rounded-[22px] border border-[#E3EAF6] bg-white px-6 pb-7 pt-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      {/* role */}
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00A651]">
        {member.role}
      </p>

      {/* photo */}
      <div className="mt-4 flex justify-center">
        <div className="flex h-[118px] w-[118px] items-center justify-center rounded-full border-[4px] border-[#7AD143] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
          <div className="relative h-[96px] w-[96px] overflow-hidden rounded-full bg-white">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* name + description */}
      <div className="mt-5 text-center">
        <h3 className="text-[12px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#203566]">
          {member.name}
        </h3>

        <div className="mt-3 space-y-1 text-[11px] leading-snug text-[#5F6F85]">
          {member.descriptionLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>

      {/* social icons row */}
      <div className="mt-5 flex justify-center gap-3">
        {member.socials.map((social) => (
          <a
            key={social.kind}
            href={social.href}
            aria-label={social.kind}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E3EAF6] bg-white text-[#00A651] shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
          >
            <Image
              src={`/icons/social-${social.kind}.svg`} // put icons in public/icons
              alt={social.kind}
              width={14}
              height={14}
              className="object-contain"
            />
          </a>
        ))}
      </div>
    </article>
  );
}
