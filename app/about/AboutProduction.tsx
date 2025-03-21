'use client';

export default function AboutProduction() {
  return (
    <div className="relative w-full bg-white text-[#212529] font-[450] min-h-[600px]">
      <div className="max-w-[1200px] mx-auto py-[30px]">
        <div className="flex flex-col lg:flex-row items-center justify-between mx-[-15px]">
          {/* Левая часть с изображением */}
          <div className="w-full lg:w-6/12 px-[40px] sm:px-[100px] lg:px-[15px] z-10 order-1 lg:order-1 mb-8 lg:mb-0">
            <div className="h-[300px] md:h-[400px] lg:h-[540px]">
              <img
                srcSet="https://klotoprint.ru/page5/images/447a13e2e0c5ccf99ddec4b6018eabdb.webp?width=575 575w,
                       https://klotoprint.ru/page5/images/447a13e2e0c5ccf99ddec4b6018eabdb.webp?width=767 767w,
                       https://klotoprint.ru/page5/images/447a13e2e0c5ccf99ddec4b6018eabdb.webp?width=991 991w,
                       https://klotoprint.ru/page5/images/447a13e2e0c5ccf99ddec4b6018eabdb.webp 1199w"
                src="https://klotoprint.ru/page5/images/447a13e2e0c5ccf99ddec4b6018eabdb.webp"
                alt="Производство"
                className="w-full h-full object-cover rounded-[24px]"
              />
            </div>
          </div>

          {/* Правая часть с текстом */}
          <div className="w-full lg:w-5/12 px-[15px] z-10 order-2 lg:order-2">
            <div className="max-w-[475px] mx-auto lg:mx-0 text-center lg:text-left">
              <div className="text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] font-bold text-white mb-6">
                Собственное производство
              </div>
              
              <div className="text-[16px] md:text-[18px] lg:text-[22px] leading-[1.45] text-white/70">
                <p>
                  Мы работаем с рекламными агентствами г. Москвы и МО, а также с государственными организациями.
                </p>
                <br />
                <p>
                  ООО Фирма "КЛОТО" занимается Производством наружной рекламы, Широкоформатной и Цифровой печати, 
                  Шелкографии, Сувенирной продукции и многое другое
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,35,126,0.8)] to-[rgba(33,33,33,0.6)]" />
    </div>
  );
} 