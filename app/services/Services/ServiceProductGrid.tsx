'use client';

import ServiceProductCard from './ServiceProductCard';

type ServiceProductGridProps = {
  products: Array<{
    image: string;
    title: string;
    description: string[];
    buttonText: string;
    buttonAction: 'order' | 'request';
  }>;
};

export default function ServiceProductGrid({ products }: ServiceProductGridProps) {
  return (
    <div className="relative bg-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-[7px] pb-[48px]">
        <div className="flex flex-wrap gap-[30px]">
          {products.map((product, index) => (
            <div key={index} className="w-[255px]">
              <ServiceProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 