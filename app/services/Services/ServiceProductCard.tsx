'use client';
import { useCart } from '@/app/hooks/useCart';
import { CartItem } from '@/app/types/cart';
import { useRequestModal } from '@/app/providers/RequestModalProvider';

interface ServiceProductProps {
  image: string;
  title: string;
  description: string | string[];
  price?: string;
  buttonText: string;
  buttonAction: 'order' | 'request';
}

export default function ServiceProductCard({
  image,
  title,
  description,
  price,
  buttonText,
  buttonAction
}: ServiceProductProps) {
  const { addToCart } = useCart();
  const { openRequestModal } = useRequestModal();

  const handleButtonClick = () => {
    if (buttonAction === 'order' && price) {
      const cartItem: CartItem = {
        title,
        image,
        description: Array.isArray(description) ? description : [description],
        price,
        quantity: 1
      };
      addToCart(cartItem);
    } else {
      // Для кнопок с buttonAction === 'request'
      openRequestModal(title);
    }
  };

  return (
    <div className="w-[255px] h-[450px] p-8 bg-white border border-black/[0.08] rounded-2xl flex flex-col justify-between">
      <div>
        <div className="w-[189px] h-[190px] mb-2 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-[18px] leading-[23.4px] font-semibold text-black mb-2 whitespace-pre-line">
          {title}
        </h3>
        
        <div className="text-[13px] leading-[15.6px] font-semibold text-black/40">
          {Array.isArray(description) ? description.map((line, index) => (
            <div key={index}>{line}</div>
          )) : description}
        </div>
      </div>
      
      <div className="mt-auto">
        {price && (
          <div className="text-[18px] leading-[23.4px] font-semibold text-[#5552E8] mb-4">
            {price}
          </div>
        )}
        
        <button 
          className="w-full h-[41px] flex items-center justify-center bg-[#5552E8] hover:bg-[#4441BA] text-white text-[15px] font-semibold leading-[15px] rounded-md transition-colors"
          onClick={handleButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
} 