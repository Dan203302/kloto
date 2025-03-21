'use client';
import { useEffect, useRef } from 'react';
import { useYandexMaps } from '../../hooks/useYandexMaps';

declare global {
  interface Window {
    ymaps: any;
  }
}

type ContactsMapProps = {
  variant?: 'index' | 'contacts';
};

export default function ContactsMap({ variant = 'index' }: ContactsMapProps) {
  const mapRef = useRef<any>(null);
  const isYandexReady = useYandexMaps();

  useEffect(() => {
    if (!isYandexReady || mapRef.current) return;

    // Создаем карту
    const map = new window.ymaps.Map('map', {
      center: [55.545240, 37.073563],
      zoom: 17,
      controls: ['zoomControl', 'fullscreenControl']
    }, {
      suppressMapOpenBlock: true
    });

    mapRef.current = map;

    // Отключаем все поведения карты по умолчанию
    map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier']);

    // Добавляем обработчик для активации/деактивации карты
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.addEventListener('click', () => {
        map.behaviors.enable(['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier']);
      });

      document.addEventListener('click', (event) => {
        if (!mapElement.contains(event.target as Node)) {
          map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier']);
        }
      });
    }

    // Создаем кастомную точку
    const placemark = new window.ymaps.Placemark([55.545240, 37.073563], {
      hintContent: 'ООО фирма "КЛОТО"',
      balloonContent: `
        <div style="padding: 10px;">
          <h3 style="font-weight: bold; margin-bottom: 5px;">ООО фирма "КЛОТО"</h3>
          <p style="margin-bottom: 5px;">г. Апрелевка, ул. Сентябрьская, д. 5</p>
          <p>ТЦ "Апрель", 2 этаж, офис 195</p>
        </div>
      `
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '',
      iconImageSize: [24, 24],
      iconImageOffset: [-12, -12],
      iconContentLayout: window.ymaps.templateLayoutFactory.createClass(
        '<div class="map-pin" style="width: 24px; height: 24px; cursor: pointer;">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="12" cy="12" r="12" fill="#5552E8"/>' +
        '<circle cx="12" cy="12" r="3" fill="white"/>' +
        '</svg>' +
        '</div>'
      )
    });

    map.geoObjects.add(placemark);

    // Добавляем обработчик клика на метку
    placemark.events.add('click', () => {
      placemark.balloon.open();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [isYandexReady]);

  const containerClasses = variant === 'index' 
    ? "relative bg-[#5552E8] w-full box-border flex flex-col lg:h-[514px] lg:flex-row"
    : "relative w-full h-[500px] font-stem";

  const mapContainerClasses = variant === 'index'
    ? "relative w-full h-[300px] lg:absolute lg:left-0 lg:top-0 lg:w-1/2 lg:h-full"
    : "w-full h-full";

  const contactsBoxClasses = variant === 'index'
    ? "w-full lg:w-1/2 lg:absolute lg:right-0 lg:top-0 lg:h-full bg-[#5552E8] py-10 lg:py-0"
    : variant === 'contacts'
      ? "absolute top-[250px] left-[165px] w-[445px] h-[409.2px] bg-[#5552E8] p-10 rounded-2xl border border-white shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] z-[3] transform -translate-y-[204.6px] md:block hidden"
      : "";

  const mobileContactsBoxClasses = variant === 'contacts'
    ? "md:hidden w-full bg-[#5552E8] p-8 z-[3]"
    : "hidden";

  const contactsInnerClasses = variant === 'index'
    ? "lg:absolute left-[100px] max-w-[600px] mx-auto lg:ml-auto lg:mr-0 px-5 lg:p-[120px_100px] flex flex-col box-border"
    : "";

  return (
    <div className={containerClasses}>
      <div className={mapContainerClasses}>
        <div id="map" className="w-full h-full" />
      </div>
      
      {/* Окно с контактами для десктопа */}
      <div className={contactsBoxClasses}>
        <div className={contactsInnerClasses}>
          {/* Заголовок */}
          <h2 className="text-[24px] lg:text-[28px] leading-[1.1] lg:leading-[30.8px] font-bold text-white mb-4 text-center lg:text-left">
            Контакты
          </h2>

          {/* Телефон и время работы */}
          <div className="text-[16px] lg:text-[18px] leading-[1.3] lg:leading-[23.4px] text-white/70 mb-4 text-center lg:text-left">
            + 7 (926) 382-89-76<br />
            По будням с 10.00 до 18.00
          </div>

          {/* Email */}
          <span 
            className="text-[16px] lg:text-[18px] leading-[1.3] lg:leading-[23.4px] text-white underline mb-4 block text-center lg:text-left"
          >
            klotoprint@bk.ru
          </span>

          {/* Адрес и время работы */}
          <div className="text-[16px] lg:text-[18px] leading-[1.3] lg:leading-[23.4px] text-white/70 text-center lg:text-left">
            г. Апрелевка, ул. Сентябрьская, д. 5<br />
            ТЦ "Апрель", 2 этаж, офис 195.<br />
            <br />
            Выдача заказов:<br />
            пн-пт: с 10.00 до 18.00
          </div>
        </div>
      </div>

      {/* Мобильное окно с контактами */}
      <div className={mobileContactsBoxClasses}>
        {/* Заголовок */}
        <h2 className="text-[24px] leading-[26.4px] font-bold text-white mb-4">
          Контакты
        </h2>

        {/* Телефон и время работы */}
        <div className="text-[15px] leading-[19.5px] text-white/70 mb-4">
          + 7 (926) 382-89-76<br />
          По будням с 10.00 до 18.00
        </div>

        {/* Email */}
        <span 
          className="text-[15px] leading-[19.5px] text-white underline mb-4 block"
        >
          klotoprint@bk.ru
        </span>

        {/* Адрес и время работы */}
        <div className="text-[15px] leading-[19.5px] text-white/70">
          г. Апрелевка, ул. Сентябрьская, д. 5<br />
          ТЦ "Апрель", 2 этаж, офис 195.<br />
          <br />
          Выдача заказов:<br />
          пн-пт: с 10.00 до 18.00
        </div>
      </div>
    </div>
  );
} 