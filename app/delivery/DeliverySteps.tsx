'use client';

type Step = {
  number: number;
  title: string;
  description: string;
  additionalInfo?: string[];
};

const steps: Step[] = [
  {
    number: 1,
    title: 'Заявка на сайте',
    description: '<span class="font-medium">Ознакомьтесь с нашей продукцией</span>\nДобавьте товары в корзину или заполните данные для индивидуального расчета и отправьте заявку'
  },
  {
    number: 2,
    title: 'Обратная связь',
    description: 'Наши менеджеры обработают заявку и свяжутся с Вами для уточнения деталей и обсудят технические параметры.'
  },
  {
    number: 3,
    title: 'Расчет и макет',
    description: 'Менеджеры отправят точный расчет по Вашему ТЗ и проверят Ваш готовый макет (при наличии) или сделают макет по запросу за доп.плату'
  },
  {
    number: 4,
    title: 'Запуск в работу',
    description: 'После проверки макета вносится предоплата',
    additionalInfo: ['Способы оплаты:', '- онлайн на карту', '- посещение офиса', '- по счету']
  },
  {
    number: 5,
    title: 'Готовность',
    description: '<span class="font-medium">После оплаты заказ отправляется в производство</span>',
    additionalInfo: ['Менеджер сообщает о готовности заказа']
  }
];

export default function DeliverySteps() {
  return (
    <div className="bg-white py-8 sm:py-12 md:py-[67px]">
      <div className="container mx-auto px-5">
        <div className="max-w-[760px] mx-auto">
          {/* Заголовок */}
          <h2 className="text-[32px] sm:text-[40px] md:text-[50px] leading-[1.2] font-bold text-[#5E35B1] text-center">
            Алгоритм оформления заказа
          </h2>
          <p className="text-[16px] sm:text-[17px] md:text-[18px] leading-[1.4] font-medium text-black/70 text-center mb-8 sm:mb-10 md:mb-12 mt-4">
            Внимательно ознакомьтесь с этапами работ
          </p>

          {/* Шаги */}
          <div className="w-full max-w-[730px] mx-auto relative">
            {/* Центральная линия с кружками для десктопа */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-16 h-full">
              {steps.map((step, index) => (
                <div key={step.number} className="relative" style={{ height: index !== steps.length - 1 ? '237.2px' : 'auto' }}>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-[#5552E8] flex items-center justify-center text-[20px] md:text-[24px] leading-[1.3] font-medium relative z-10 shadow-[0_8px_40px_0_rgba(0,0,0,0.1)]">
                    {step.number}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="absolute top-12 md:top-16 left-1/2 -translate-x-1/2 w-[2px] h-[calc(100%-16px)] border-dashed border-l-2 border-[#5552E8]/20" />
                  )}
                </div>
              ))}
            </div>

            {/* Мобильная версия */}
            <div className="md:hidden">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-start mb-8 relative">
                  {/* Пунктирная линия */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-5 top-10 w-[2px] h-[calc(100%+32px)] border-dashed border-l-2 border-[#5552E8]/20" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-white text-[#5552E8] flex items-center justify-center text-[18px] leading-[1.3] font-medium shadow-[0_8px_40px_0_rgba(0,0,0,0.1)] flex-shrink-0 mr-4 relative z-10">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-[18px] sm:text-[20px] text-black font-bold mb-2">{step.title}</h3>
                    <p className="text-black/70 text-[14px] sm:text-[16px] whitespace-pre-line" 
                       dangerouslySetInnerHTML={{ __html: step.description }} />
                    {step.additionalInfo && (
                      <div className="mt-2 text-black/70 text-[14px] sm:text-[16px]">
                        {step.additionalInfo.map((info, index) => (
                          <div key={index}>{info}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Десктопная версия */}
            <div className="hidden md:block">
              {steps.map((step) => (
                <div key={step.number} className="flex justify-center" style={{ height: step.number !== steps.length ? '237.2px' : 'auto' }}>
                  {/* Левая часть (для нечетных) */}
                  <div className="w-[301px] pr-8 text-right">
                    {step.number % 2 === 1 && (
                      <>
                        <h3 className="text-[24px] text-black font-bold mb-2">{step.title}</h3>
                        <p className="text-black/70 text-[18px] whitespace-pre-line" 
                           dangerouslySetInnerHTML={{ __html: step.description }} />
                        {step.additionalInfo && (
                          <div className="mt-2 text-black/70">
                            {step.additionalInfo.map((info, index) => (
                              <div key={index}>{info}</div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Пустое место для кружка */}
                  <div className="w-16" />

                  {/* Правая часть (для четных) */}
                  <div className="w-[301px] pl-8">
                    {step.number % 2 === 0 && (
                      <>
                        <h3 className="text-[24px] text-black font-bold mb-2">{step.title}</h3>
                        <p className="text-black/70 text-[18px] whitespace-pre-line" 
                           dangerouslySetInnerHTML={{ __html: step.description }} />
                        {step.additionalInfo && (
                          <div className="mt-2 text-black/70 text-[18px]">
                            {step.additionalInfo.map((info, index) => (
                              <div key={index}>{info}</div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 