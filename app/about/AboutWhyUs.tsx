'use client';

import { useRef, useEffect } from 'react';

export default function AboutWhyUs() {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Создаем новый элемент script для API YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    
    // Создаем функцию, которая будет вызвана после загрузки API
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(videoRef.current!, {
        events: {
          onReady: (event: { target: { playVideo: () => void } }) => {
            event.target.playVideo();
          }
        }
      });
    };

    // Добавляем скрипт на страницу
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Очистка при размонтировании
    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  return (
    <div className="relative w-full bg-[#5552E8] text-white min-h-[596px] lg:h-[596px]">
      {/* Видео для мобильных устройств */}
      <div className="w-full h-[300px] block lg:hidden">
        <iframe
          src="https://www.youtube.com/embed/ZfoWctJFfrY?enablejsapi=1&version=3&playerapiid=ytplayer&start=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&autoplay=1&mute=1&loop=1&controls=0&playlist=ZfoWctJFfrY"
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay"
        />
      </div>

      {/* Контейнер для контента */}
      <div className="max-w-[1200px] mx-auto py-8 lg:py-[98px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          {/* Левая часть с текстом */}
          <div className="w-full lg:w-5/12 px-[15px] text-center lg:text-left">
            <div className="max-w-[475px] mx-auto lg:mx-0">
              <h1 className="text-[48px] md:text-[56px] lg:text-[64px] leading-[1.1] font-bold mb-6">
                Почему мы?
              </h1>
              
              <div className="text-[20px] md:text-[22px] lg:text-[24px] leading-[1.3] text-white/70">
                <p>
                  Мы обеспечиваем полиграфической продукцией внутренних и внешних потребителей, 
                  тем самым содействуя продвижению наших партнеров на рынке.
                </p>
                <br />
                <p>
                  За счет:
                  <br />
                  - индивидуального подхода к каждому клиенту
                  <br />
                  - оперативной работы
                </p>
              </div>
            </div>
          </div>

          {/* Видео для десктопа - абсолютно позиционированное */}
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <iframe
              ref={videoRef}
              src="https://www.youtube.com/embed/ZfoWctJFfrY?enablejsapi=1&version=3&playerapiid=ytplayer&start=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&autoplay=1&mute=1&loop=1&controls=0&playlist=ZfoWctJFfrY"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 