'use client';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

let isScriptLoading = false;
let isScriptLoaded = false;

export function useYandexMaps() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isScriptLoaded) {
      window.ymaps.ready(() => setIsReady(true));
      return;
    }

    if (isScriptLoading) return;

    isScriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    
    script.onload = () => {
      isScriptLoaded = true;
      window.ymaps.ready(() => setIsReady(true));
    };

    document.body.appendChild(script);

    return () => {
      // Не удаляем скрипт при размонтировании
    };
  }, []);

  return isReady;
} 