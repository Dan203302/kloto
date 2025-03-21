'use client';
import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { videos } from './videoData';

export default function VideoSlider() {
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

  const nextSlide = () => {
    if (isTransitioning || currentSlide >= videos.length - getVisibleCards()) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 2;
    return window.innerWidth >= 1024 ? 2 : 1;
  };

  const maxSlide = videos.length - getVisibleCards();

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
    <div className="relative bg-white mb-[23px]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="relative flex justify-center">
          <div className={`relative ${!isMounted ? 'invisible' : 'visible'} w-[350px] sm:w-[540px] lg:w-[1110px] transition-[width]`}>
            <div className="overflow-hidden">
              <div 
                className="flex gap-[30px] transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (isMounted ? (window.innerWidth >= 1024 ? 570 : window.innerWidth >= 640 ? 570 : 380) : 0)}px)` 
                }}
              >
                {videos.map((video, index) => (
                  <div key={index} className="flex-shrink-0">
                    <VideoCard 
                      videoId={video.videoId}
                      previewImage={video.previewImage}
                      options={video.options}
                    />
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
              className={`absolute left-0 top-[calc(50%-16px)] -translate-y-1/2 -translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
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
              disabled={currentSlide >= videos.length - getVisibleCards()}
              className={`absolute right-0 top-[calc(50%-16px)] -translate-y-1/2 translate-x-1/2 w-12 lg:w-16 h-12 lg:h-16 flex items-center justify-center rounded-full bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-10 ${
                currentSlide >= videos.length - getVisibleCards()
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
              {Array.from({ length: videos.length - getVisibleCards() + 1 }).map((_, index) => (
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