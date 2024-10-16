import BestSeller from '@/components/BestSeller';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LatestCollection from '@/components/LatestCollection';
import NewsletterBox from '@/components/NewsletterBox';
import OurPolicy from '@/components/OurPolicy';
import Collection from './Collection';
export default function Home() {
    return (
        <>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsletterBox />
            <Collection />
            <Footer />
        </>
    );
}