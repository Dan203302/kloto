'use client';
import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'ЕСТЬ ЛИ У ВАС ВОЗМОЖНОСТЬ ДОСТАВКИ?',
    answer: 'Да, стоимость доставки рассчитывается после предварительного согласования с менеджером.'
  },
  {
    question: 'КОГДА ЗАКАЗ БУДЕТ ГОТОВ?',
    answer: 'После утверждения макета и предоплаты, заказ запускается в производство. Сроки исполнения зависят от загруженности производства и объема заказа. Менеджер сориентируется Вас по срокам после оформления заказа.'
  }
];

export default function DeliveryFaq() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndexes(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="relative w-full">
      <div className="w-full max-w-[1200px] mx-auto py-5 pb-[60px] px-5">
        <div className="w-full max-w-[730px] mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-6">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-[16px] sm:text-[18px] md:text-[20px] leading-[1.5] font-bold text-black min-h-[40px] cursor-pointer text-left"
              >
                <div className="pr-4">{item.question}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className={`flex-shrink-0 text-[#FFB300] transition-transform w-8 h-8 sm:w-10 sm:h-10 ${
                    openIndexes.includes(index) ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    fill="currentColor"
                    d="M12 13.8238L6.6325 9.52978C6.43843 9.37452 6.15525 9.40599 5.99999 9.60006C5.84474 9.79412 5.8762 10.0773 6.07027 10.2326L12 14.9763L17.9297 10.2326C18.1238 10.0773 18.1552 9.79412 18 9.60006C17.8447 9.40599 17.5616 9.37452 17.3675 9.52978L12 13.8238Z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div 
                className={`mt-2 text-black/70 text-[14px] sm:text-[16px] md:text-[18px] transition-all duration-300 ease-in-out overflow-hidden`}
                style={{ 
                  maxHeight: openIndexes.includes(index) ? '200px' : '0',
                  opacity: openIndexes.includes(index) ? 1 : 0,
                  marginBottom: openIndexes.includes(index) ? '16px' : '0'
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 