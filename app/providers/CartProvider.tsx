'use client';
import { createContext, useContext } from 'react';
import { useCart as useCartHook } from '@/app/hooks/useCart';
import { CartContextType } from '@/app/types/cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCartHook();
  
  console.log('CartProvider render, items:', cartState.items);

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 