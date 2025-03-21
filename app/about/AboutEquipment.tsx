'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { equipmentImages } from './equipmentData';

export default function AboutEquipment() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 4;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  const getSliderWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 'w-[1110px]'; // 4 карточки: (255 * 4) + (30 * 3)
      if (window.innerWidth >= 768) return 'w-[825px]';   // 3 карточки: (255 * 3) + (30 * 2)
      if (window.innerWidth >= 640) return 'w-[540px]';   // 2 карточки: (255 * 2) + 30
      return 'w-[255px]';                                 // 1 карточка
    }
    return 'w-[1110px]';
  };

  const [sliderWidth, setSliderWidth] = useState(getSliderWidth());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
      setSliderWidth(getSliderWidth());
      setCurrentSlide(prev => Math.min(prev, equipmentImages.length - getVisibleCards()));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning || currentSlide >= equipmentImages.length - visibleCards) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  return (
    <div className="relative w-full bg-white" style={{ height: '563.594px' }}>
      <div className="max-w-[1200px] mx-auto py-[10px]">
        <div className="container mx-auto px-[15px] max-w-[1140px]">
          {/* Заголовок */}
          <div className="text-[48px] leading-[52.8px] font-bold text-black text-center mb-[10px] max-w-[720px] mx-auto">
            Наше Оборудование
          </div>

          {/* Слайдер */}
          <div className="relative flex justify-center">
            <div className={`relative ${sliderWidth}`}>
              {/* Навигационные кнопки */}
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`absolute -left-[23px] top-[139px] lg:-left-[30px] w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
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
                disabled={currentSlide >= equipmentImages.length - visibleCards}
                className={`absolute -right-[12px] lg:-right-[33px] top-[139px] w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                  currentSlide >= equipmentImages.length - visibleCards
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#5552E8] hover:bg-[#5552E8] hover:text-white'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                  <path d="M15.093 12L10.0542 6.40139L10.9462 5.59863L16.7074 12L10.9462 18.4014L10.0542 17.5986L15.093 12Z" fill="currentColor"/>
                </svg>
              </button>

              <div className="overflow-hidden px-[1px]">
                <div 
                  className="flex gap-[30px] transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (255 + 30)}px)` }}
                >
                  {equipmentImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                      <div className="w-[255px] h-[350px] relative rounded-[16px] overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="255px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Пагинация */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: equipmentImages.length - visibleCards + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
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
      </div>
    </div>
  );
} 