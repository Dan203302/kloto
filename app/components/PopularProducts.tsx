'use client';
import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { products, ProductType } from './ProductCard';
import ServiceProductCard from '@/app/services/Services/ServiceProductCard';
import { servicesData } from '@/app/services/Services/servicesData';

export default function PopularProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const maxSlide = servicesData.main.products.length - getVisibleCards();

  const moveSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev >= maxSlide) return 0;
      return prev + 1;
    });

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, maxSlide]);

  // Автоматическое листание
  useEffect(() => {
    if (!autoplayEnabled || !isMounted) return;

    const interval = setInterval(moveSlide, 3000);
    return () => clearInterval(interval);
  }, [autoplayEnabled, isMounted, moveSlide]);

  const handleNavigation = () => {
    setAutoplayEnabled(false);
  };

  return (
    <div className="relative bg-primary-300 py-[60px]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Слайдер слева */}
          <div className="lg:w-3/4">
            <div className="relative flex justify-center">
              <div className={`relative ${!isMounted ? 'invisible' : 'visible'} w-[255px] md:w-[540px] lg:w-[825px] transition-[width]`}>
                <div className="overflow-hidden">
                  <div 
                    className="flex gap-[30px] transition-transform duration-300 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSlide * (isMounted ? 285 : 0)}px)` 
                    }}
                  >
                    {servicesData.main.products.map((product, index) => (
                      <div key={index} className="flex-shrink-0">
                        <ServiceProductCard {...product} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Навигационные кнопки */}
                <button
                  onClick={() => {
                    handleNavigation();
                    setCurrentSlide(prev => prev - 1);
                  }}
                  disabled={currentSlide === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                    currentSlide === 0 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-primary hover:bg-primary hover:text-accent-foreground'
                  } transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M8.90704 12L13.9458 6.40139L13.0538 5.59863L7.29261 12L13.0538 18.4014L13.9458 17.5986L8.90704 12Z" fill="currentColor"/>
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    handleNavigation();
                    setCurrentSlide(prev => prev + 1);
                  }}
                  disabled={currentSlide >= servicesData.main.products.length - getVisibleCards()}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                    currentSlide >= servicesData.main.products.length - getVisibleCards()
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-primary hover:bg-primary hover:text-accent-foreground'
                  } transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path d="M15.093 12L10.0542 6.40139L10.9462 5.59863L16.7074 12L10.9462 18.4014L10.0542 17.5986L15.093 12Z" fill="currentColor"/>
                  </svg>
                </button>

                {/* Пагинация */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: servicesData.main.products.length - getVisibleCards() + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleNavigation();
                        setCurrentSlide(index);
                      }}
                      className={`h-1 w-6 rounded-sm transition-colors ${
                        currentSlide === index 
                          ? 'bg-[#5552E8]' 
                          : 'bg-gray-200'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Заголовки справа */}
          <div className="lg:w-1/4 lg:flex lg:flex-col lg:justify-center text-center lg:text-left lg:pl-[60px]">
            <h2 className="text-[28px] md:text-[40px] leading-[1.1] text-primary-200 font-bold text-black mb-4">
              Популярные товары
            </h2>
            <h3 className="text-[16px] md:text-[24px] leading-[1.3] text-primary-200">
              Наши лучшие предложения
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
} 