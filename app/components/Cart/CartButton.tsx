'use client';

import { useCart } from '@/app/providers/CartProvider';
import { useState, useEffect } from 'react';
import CartModal from './CartModal';
import { cartStore } from '@/app/store/cartStore';
import { CartItem } from '@/app/types/cart';

export default function CartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Подписываемся напрямую на cartStore
  useEffect(() => {
    const updateState = (items: CartItem[]) => {
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(total);
      setIsVisible(total > 0);
    };

    // Инициализация
    updateState(cartStore.getItems());
    
    // Подписка на изменения
    const unsubscribe = cartStore.subscribe(updateState);
    return () => { unsubscribe(); };
  }, []);

  return (
    <>
      <div 
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-16 h-16 bg-[#FF8A00] rounded-full shadow-lg hover:bg-[#E67A00] transition-colors"
        >
          <div className="relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[#FF8A00] text-xs font-bold">
              {totalItems}
            </div>
          </div>
        </button>
      </div>

      <CartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
} 