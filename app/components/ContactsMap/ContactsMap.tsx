'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function ContactsMap() {
  useEffect(() => {
    // Загружаем API Яндекс.Карт
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        // Создаем карту
        const map = new window.ymaps.Map('map', {
          center: [55.545240, 37.073563],
          zoom: 17,
          controls: ['zoomControl', 'fullscreenControl']
        }, {
          suppressMapOpenBlock: true
        });

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
      });
    };

    return () => {
      const scriptElement = document.querySelector('script[src*="api-maps.yandex.ru"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <div className="relative bg-[#5552E8] w-full box-border flex flex-col lg:h-[514px] lg:flex-row">
      {/* Карта */}
      <div className="relative w-full h-[300px] lg:absolute lg:left-0 lg:top-0 lg:w-1/2 lg:h-full">
        <div id="map" className="w-full h-full" />
      </div>

      {/* Контактная информация */}
      <div className="w-full lg:w-1/2 lg:absolute lg:right-0 lg:top-0 lg:h-full bg-[#5552E8] py-10 lg:py-0">
        <div className="max-w-[600px] mx-auto lg:ml-auto lg:mr-0 px-5 lg:p-[120px_165px] flex flex-col box-border">
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
    </div>
  );
} 