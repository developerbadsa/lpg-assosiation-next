
import Footer from './../components/layout/Footer';
import {HeroSection} from './../components/home/HeroSection';
import SponsorsSection from './../components/home/SponsorsSection/index';
import OurPartnersSection from './../components/home/sections/OurPartnersSection';

export default function Home() {
   return (
      <div className=''>
         <HeroSection />
         <SponsorsSection/>
         <OurPartnersSection/>
         <Footer />
      </div>
   );
}
