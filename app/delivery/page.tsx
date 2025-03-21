import DeliveryHeader from './DeliveryHeader';
import DeliverySteps from './DeliverySteps';
import DeliveryFaqTitle from './DeliveryFaqTitle';
import DeliveryFaq from './DeliveryFaq';

export default function DeliveryPage() {
  return (
    <main>
      <DeliveryHeader />
      <DeliverySteps />
      <DeliveryFaqTitle />
      <DeliveryFaq />
    </main>
  );
} 