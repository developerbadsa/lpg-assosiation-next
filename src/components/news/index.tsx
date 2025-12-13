import PageHero from '@/components/shared/PageHero';
import Footer from '@/components/layout/Footer';
import newsHero from '@assets/newsfeed-img/banner.png';

import AlbumsHeroSliderSection from './sections/AlbumsHeroSliderSection';
import AlbumsGridSection from './sections/album/AlbumsGridSection';

const NewsFeedPage = () => {
   return (
      <main className='relative '>
         <PageHero
            title='News Feed'
            subtitle='Updates, events and media from Bangladesh LPG Autogas Station & Conversion Workshop Owners’ Association'
            backgroundImage={newsHero}
            height='compact'
         />

         <AlbumsHeroSliderSection />
         <AlbumsGridSection />

         <Footer />
      </main>
   );
};

export default NewsFeedPage;
