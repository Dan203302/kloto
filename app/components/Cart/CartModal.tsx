'use client';
import { useEffect, useRef } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import CartItem from './CartItem';
import CartForm from './CartForm';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[500] p-4 md:p-10 overflow-auto">
      <div 
        ref={modalRef}
        className="relative w-full max-w-[700px] mx-auto bg-white rounded-3xl p-6 md:p-20 flex flex-col shadow-[0_8px_40px_0_rgba(0,0,0,0.1)]"
      >
        {/* Крестик закрытия */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 text-[#212529] cursor-pointer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L12 10.5858L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L13.4142 12L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L12 13.4142L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L10.5858 12L6.29289 7.70711Z" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
        </button>

        {/* Заголовок */}
        <h2 className="text-[32px] md:text-[48px] leading-[1.1] font-bold text-[#212529] text-center mb-4">
          Ваш заказ
        </h2>

        {/* Список товаров */}
        <div className="mb-8 overflow-auto max-h-[50vh] md:max-h-[60vh]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Корзина пуста</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.title} item={item} />
              ))}
            </ul>
          )}
          
          {items.length > 0 && (
            <h3 className="text-right text-[16px] md:text-[18px] leading-[1.3] font-medium text-black mt-4">
              {items.reduce((sum, item) => {
                const price = item.price ? parseInt(item.price.replace(/\D/g, '')) : 0;
                return sum + (price * item.quantity);
              }, 0)} ₽
            </h3>
          )}
        </div>

        {/* Форма заказа */}
        {items.length > 0 && <CartForm onClose={onClose} />}

        {/* Текст о соглашении */}
        <div className="text-[13px] md:text-[15px] leading-[1.3] text-[#212529] mt-4">
          Оставляя заявку, вы соглашаетесь на{' '}
          <a href="/" className="underline text-[#212529]">
            обработку персональных данных
          </a>{' '}
          и с{' '}
          <a href="/" className="underline text-[#212529]">
            условиями бронирования счёта
          </a>
        </div>
      </div>
    </div>
  );
} 