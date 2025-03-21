'use client';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (element: HTMLIFrameElement, config: any) => any;
    };
  }
}

type AboutInfo = {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
};

const aboutInfo: AboutInfo[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="currentColor">
          <path d="M9.5 4C9.5 3.44772 9.05228 3 8.5 3C7.94772 3 7.5 3.44772 7.5 4V5H6.5C4.84315 5 3.5 6.34315 3.5 8V11V18C3.5 19.6569 4.84315 21 6.5 21H18.5C20.1569 21 21.5 19.6569 21.5 18V11V8C21.5 6.34315 20.1569 5 18.5 5H17.5V4C17.5 3.44772 17.0523 3 16.5 3C15.9477 3 15.5 3.44772 15.5 4V5H9.5V4ZM7.5 7V7.5C7.5 8.05228 7.94772 8.5 8.5 8.5C9.05228 8.5 9.5 8.05228 9.5 7.5V7H15.5V7.5C15.5 8.05228 15.9477 8.5 16.5 8.5C17.0523 8.5 17.5 8.05228 17.5 7.5V7H18.5C19.0523 7 19.5 7.44772 19.5 8V10H5.5V8C5.5 7.44772 5.94772 7 6.5 7H7.5ZM5.5 12V18C5.5 18.5523 5.94772 19 6.5 19H18.5C19.0523 19 19.5 18.5523 19.5 18V12H5.5Z" />
        </g>
      </svg>
    ),
    title: 'На рынке',
    description: 'с 1991 года'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="currentColor">
          <path d="M6.5 10C6.5 6.68629 9.18629 4 12.5 4C15.8137 4 18.5 6.68629 18.5 10C18.5 10.4933 18.3357 11.1554 17.9953 11.9624C17.6605 12.7557 17.185 13.6209 16.6328 14.5002C15.5285 16.2585 14.1662 17.9967 13.1553 19.2132C12.8055 19.6341 12.1945 19.6341 11.8447 19.2132C10.8338 17.9967 9.47145 16.2585 8.36718 14.5002C7.81497 13.6209 7.33947 12.7557 7.00474 11.9624C6.66426 11.1554 6.5 10.4933 6.5 10ZM12.5 2C8.08172 2 4.5 5.58172 4.5 10C4.5 10.8792 4.77687 11.827 5.16204 12.7399C5.55296 13.6664 6.08762 14.631 6.6735 15.5639C7.84539 17.4298 9.27087 19.2452 10.3065 20.4915C11.456 21.8747 13.544 21.8747 14.6935 20.4915C15.7291 19.2452 17.1546 17.4298 18.3265 15.5639C18.9124 14.631 19.447 13.6664 19.838 12.7399C20.2231 11.827 20.5 10.8792 20.5 10C20.5 5.58172 16.9183 2 12.5 2ZM10.5 10C10.5 8.89543 11.3954 8 12.5 8C13.6046 8 14.5 8.89543 14.5 10C14.5 11.1046 13.6046 12 12.5 12C11.3954 12 10.5 11.1046 10.5 10ZM12.5 6C10.2909 6 8.5 7.79086 8.5 10C8.5 12.2091 10.2909 14 12.5 14C14.7091 14 16.5 12.2091 16.5 10C16.5 7.79086 14.7091 6 12.5 6Z" />
        </g>
      </svg>
    ),
    title: 'Расположение',
    description: (
      <>
        143360, МО, г. Апрелевка<br />
        ул. Сентябрьская, д 5<br />
        2 этаж офис 195
      </>
    )
  }
];

export default function AboutHero() {
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
    <div className="relative w-full bg-[#151515] overflow-hidden" style={{ height: '463px' }}>
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <img
          srcSet="https://klotoprint.ru/page5/images/91b329ac589a33ca5a1682139b0588e4.jpeg?width=575 575w,
                 https://klotoprint.ru/page5/images/91b329ac589a33ca5a1682139b0588e4.jpeg?width=767 767w,
                 https://klotoprint.ru/page5/images/91b329ac589a33ca5a1682139b0588e4.jpeg?width=991 991w,
                 https://klotoprint.ru/page5/images/91b329ac589a33ca5a1682139b0588e4.jpeg 1199w"
          src="https://klotoprint.ru/page5/images/91b329ac589a33ca5a1682139b0588e4.jpeg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Градиентный оверлей */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(33,33,33,0.7)] to-[rgba(38,50,56,0.7)]" />
      </div>

      {/* Контент */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-bold text-white text-center mb-8">
            ООО фирма "КЛОТО"
          </h1>

          {/* Информационные блоки */}
          <div className="flex flex-col sm:flex-row justify-center gap-12 max-w-[825px]">
            {aboutInfo.map((info, index) => (
              <div key={index} className="flex items-start">
                {/* Иконка в круге */}
                <div className="w-[56px] h-[56px] flex items-center justify-center bg-white/10 rounded-full mr-6 flex-shrink-0">
                  <div className="w-6 h-6">
                    {info.icon}
                  </div>
                </div>
                {/* Текст */}
                <div>
                  <h2 className="text-[28px] leading-[30.8px] font-bold text-white mb-1">
                    {info.title}
                  </h2>
                  <div className="text-[18px] leading-[23.4px] text-white/70">
                    {info.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 