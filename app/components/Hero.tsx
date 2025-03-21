import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-white">
      <div className="flex flex-col lg:flex-row min-h-[451px]">
        {/* Левая часть с изображением */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[451px] relative">
          <Image
            src="https://klotoprint.ru/images/e5f2de0988083c98073829b54a842fb6.jpeg"
            alt="Полиграфия"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={100}
          />
        </div>

        {/* Правая часть */}
        <div className="w-full lg:w-1/2">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
            <div className="mt-[40px] lg:mt-0 flex justify-center lg:justify-start">
              <div className="w-full lg:w-10/12 lg:pl-[120px] py-8 lg:py-0 flex items-center">
                <div className="w-full text-center lg:text-left">
                  <h1 className="text-[40px] md:text-[52px] lg:text-[64px] leading-[1.1] font-bold text-black mb-6 mx-auto lg:mx-0 max-w-[445px]">
                    Полиграфия для бизнеса
                  </h1>
                  
                  <div className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] text-black/70 mb-8">
                    <p>Печатная продукция</p>
                    <p>Наружная реклама</p>
                    <p>Брендирование</p>
                    <p>Рекламные конструкции</p>
                    <p>Широкоформатная печать</p>
                  </div>

                  <div className="flex justify-center lg:justify-start">
                    <a 
                      href="/catalog"
                      className="inline-flex items-center h-[50px] lg:h-[62px] px-6 lg:px-8 bg-[#5552E8] hover:bg-[#4441CA] text-white text-[16px] lg:text-[18px] leading-[18px] rounded-md transition-colors"
                    >
                      <span>Перейти к каталогу</span>
                      <svg className="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15.093 12L10.0542 6.40139L10.9462 5.59863L16.7074 12L10.9462 18.4014L10.0542 17.5986L15.093 12Z" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 