'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { portfolioImages } from './portfolioData';

export default function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const maxSlide = portfolioImages.length - getVisibleCards();

  const nextSlide = () => {
    if (isTransitioning || currentSlide >= maxSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  // Автоматическое листание
  useEffect(() => {
    if (!autoplayEnabled || !isMounted) return;

    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        
        if (direction === 'right') {
          if (currentSlide >= maxSlide) {
            setDirection('left');
            setCurrentSlide(prev => prev - 1);
          } else {
            setCurrentSlide(prev => prev + 1);
          }
        } else {
          if (currentSlide <= 0) {
            setDirection('right');
            setCurrentSlide(prev => prev + 1);
          } else {
            setCurrentSlide(prev => prev - 1);
          }
        }

        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplayEnabled, isMounted, currentSlide, direction, maxSlide, isTransitioning]);

  const handleNavigation = () => {
    setAutoplayEnabled(false);
  };

  return (
    <div className="relative bg-white py-[15px] mb-[60px]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Заголовки */}
        <div className="max-w-[720px] mx-auto text-center mb-16">
          <h2 className="text-[48px] leading-[1.1] font-bold text-black mb-4">
            Наше портфолио
          </h2>
          <h3 className="text-[24px] leading-[1.3] text-black/70">
            Проекты, над которыми мы работали
          </h3>
        </div>

        {/* Слайдер */}
        <div className="relative flex justify-center">
          <div className={`relative ${!isMounted ? 'invisible' : 'visible'} w-[350px] sm:w-[730px] lg:w-[1110px] transition-[width]`}>
            <div className="overflow-hidden">
              <div 
                className="flex gap-[30px] transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (isMounted ? 380 : 0)}px)` 
                }}
              >
                {portfolioImages.map((image, index) => (
                  <div key={index} className="flex-shrink-0">
                    <div className="w-[350px] h-[350px] relative rounded-2xl overflow-hidden">
                      <Image
                        src={`https://klotoprint.ru${image.src}`}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="350px"
                        quality={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Навигационные кнопки */}
            <button
              onClick={() => {
                handleNavigation();
                prevSlide();
              }}
              disabled={currentSlide === 0}
              className={`absolute left-0 top-[calc(50%-12px)] -translate-y-1/2 -translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
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
              onClick={() => {
                handleNavigation();
                nextSlide();
              }}
              disabled={currentSlide >= maxSlide}
              className={`absolute right-0 top-[calc(50%-12px)] -translate-y-1/2 translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                currentSlide >= maxSlide
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-[#5552E8] hover:bg-[#5552E8] hover:text-white'
              } transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <path d="M15.093 12L10.0542 6.40139L10.9462 5.59863L16.7074 12L10.9462 18.4014L10.0542 17.5986L15.093 12Z" fill="currentColor"/>
              </svg>
            </button>

            {/* Пагинация */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: portfolioImages.length - getVisibleCards() + 1 }).map((_, index) => (
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
    </div>
  );
} 