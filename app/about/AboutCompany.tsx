'use client';

export default function AboutCompany() {
  return (
    <div className="relative w-full bg-white text-[#212529] font-[450] min-h-[448px] lg:h-[448px]">
      {/* Изображение */}
      <div className="w-full lg:absolute lg:top-0 lg:right-0 lg:w-1/2 h-[300px] md:h-[346px] lg:h-full">
        <img
          srcSet="https://klotoprint.ru/page5/images/b154cb3116793c3dbde9af2c89f27037.webp?width=575 575w,
                 https://klotoprint.ru/page5/images/b154cb3116793c3dbde9af2c89f27037.webp?width=767 767w,
                 https://klotoprint.ru/page5/images/b154cb3116793c3dbde9af2c89f27037.webp?width=991 991w,
                 https://klotoprint.ru/page5/images/b154cb3116793c3dbde9af2c89f27037.webp 1199w"
          src="https://klotoprint.ru/page5/images/b154cb3116793c3dbde9af2c89f27037.webp"
          alt="О компании"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Контейнер для текста */}
      <div className="max-w-[1140px] mx-auto">
        <div className="lg:h-[346px] mx-[-15px] py-8 lg:py-[51px]">
          {/* Текстовый блок */}
          <div className="w-full lg:w-5/12 px-[15px]">
            <div className="max-w-[475px] mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] font-medium text-black mb-6">
                О Компании
              </h1>
              
              <div className="text-[16px] md:text-[18px] leading-[1.6] text-black/70">
                <p>
                  Рекламно-производственная фирма КЛОТО
                  <br />
                  Это развивающаяся компания полного цикла, действующая на рынке с 1991 г.
                </p>
                <br />
                <p>
                  С каждым годом предприятие развивается, вводятся новые технологии, 
                  производится модернизация производства, постоянно ведется поиск 
                  новых партнеров и клиентов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 