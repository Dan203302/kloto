'use client';

import Image from 'next/image';

export default function DeliveryHeader() {
  return (
    <div className="relative bg-white h-[743.8px] lg:h-[371.9px] w-full">
      {/* Контейнер с изображением - на мобильных сверху, на десктопе слева */}
      <div className="absolute top-0 left-0 w-full h-1/2 lg:h-full lg:w-1/2">
        <Image
          src="https://klotoprint.ru/page7/images/8bfa2e44c71f7a8e4423385a01d4c3b1.webp"
          alt="Самовывоз"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={100}
        />
      </div>

      {/* Контейнер с контентом */}
      <div className="relative h-full w-full mx-auto">
        {/* На мобильных контент внизу, на десктопе справа */}
        <div className="pt-[380px] px-10 lg:pt-0 lg:pl-[calc(50%+110px)] lg:pr-10 lg:h-full">
          <div className="text-center lg:text-left py-[66px] lg:flex lg:flex-col lg:justify-center lg:h-full">
            {/* Заголовок */}
            <h1 className="text-[40px] leading-[52.8px] font-bold text-black mb-8">
              Самовывоз
            </h1>

            {/* Описание */}
            <div className="text-[18px] leading-[23.4px] text-black/70 max-w-full">
              <p className="font-[450]">
                <span className="lg:block mb-2">Самовывоз производится после уведомления</span>
                <span className="lg:block mb-2">менеджера о готовности заказа в рабочие дни.</span>
              </p>  
              <p className="font-medium text-[20px]">
                По адресу: ТЦ Апрель, 2ой этаж, офис 195
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 