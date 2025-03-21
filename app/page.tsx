import Portfolio from './components/Portfolio/Portfolio';
import Partners from './components/Partners/Partners';
import VideoSlider from './components/VideoSlider/VideoSlider';
import ContactForm from './components/ContactForm/ContactForm';

import ContactsMap from './components/shared/ContactsMap';
import PopularProducts from './components/PopularProducts';
import Hero from './components/Hero';
import ServiceProductCard from '@/app/services/Services/ServiceProductCard';
import { servicesData } from '@/app/services/Services/servicesData';

export default function Home() {
  return (
    <main>
      <Hero />
      <PopularProducts />
      <Portfolio />
      <VideoSlider />
      <Partners />
      <ContactForm />

      <ContactsMap variant="index" />

    </main>
  );
}
