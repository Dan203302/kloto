'use client';
import { useState, useEffect } from 'react';
import ProductCard from './ServiceProductCard';

export type ServiceProduct = {
  image: string;
  title: string;
  description: string[];
  price?: string;
  buttonText: string;
  buttonAction: 'order' | 'request';
};

type ServiceProductsProps = {
  title: string;
  subtitle?: string;
  subtitleColor?: 'blue' | 'black';
  description: string;
  additionalInfo: string;
  products: ServiceProduct[];
};

export default function ServiceProducts({ 
  title, 
  subtitle,
  subtitleColor = 'blue',
  description, 
  additionalInfo, 
  products = []
}: ServiceProductsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [containerWidth, setContainerWidth] = useState('w-[826px]');

  const cardWidth = 255; // ширина карточки
  const cardGap = 30; // отступ между карточками
  const totalWidth = cardWidth + cardGap; // общая ширина одной карточки с отступом

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
        setContainerWidth('w-[826px]');
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
        setContainerWidth('w-[540px]');
      } else {
        setVisibleCards(1);
        setContainerWidth('w-[255px]');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (!isTransitioning && currentSlide < products.length - visibleCards) {
      setIsTransitioning(true);
      setCurrentSlide(current => current + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning && currentSlide > 0) {
      setIsTransitioning(true);
      setCurrentSlide(current => current - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div className="relative bg-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-[7px] pb-[48px]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка с информацией */}
          <div className="w-full lg:w-[285px] lg:pr-4">
            <div className="mb-4">
              <div className="text-[28px] font-bold text-[#212121]">{title}</div>
              {subtitle ? (
                <div className={`text-[28px] font-bold ${
                  subtitleColor === 'blue' ? 'text-[#3936CC]' : 'text-[#212121]'
                } -mt-2`}>{subtitle}</div>
              ) : (
                <div className="-mt-2">&nbsp;</div>
              )}
            </div>
            
            <div className="text-[18px] leading-[23.4px] font-medium text-black/70 mb-6">
              {description}
            </div>
            
            <div className="text-[14px] leading-[23.4px] font-medium text-black/70">
              {additionalInfo}
            </div>
          </div>

          {/* Правая колонка с карточками */}
          {products && products.length > 0 && (
            <div className={`${containerWidth} relative mx-auto lg:mx-0`}>
              <div className="overflow-hidden">
                <div 
                  className="flex gap-[30px] transition-transform duration-300"
                  style={{ transform: `translateX(-${currentSlide * totalWidth}px)` }}
                >
                  {products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                  ))}
                </div>
              </div>

              {/* Навигационные кнопки */}
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0 || isTransitioning}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                  currentSlide === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#5552E8] hover:bg-[#5552E8] hover:text-white'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <path d="M8.90704 12L13.9458 6.40139L13.0538 5.59863L7.29261 12L13.0538 18.4014L13.9458 17.5986L8.90704 12Z" fill="currentColor"/>
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentSlide >= products.length - visibleCards || isTransitioning}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                  currentSlide >= products.length - visibleCards
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#5552E8] hover:bg-[#5552E8] hover:text-white'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <path d="M15.093 12L10.0542 6.40139L10.9462 5.59863L16.7074 12L10.9462 18.4014L10.0542 17.5986L15.093 12Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 