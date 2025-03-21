'use client';
import { useState, useEffect } from 'react';
import { cartStore } from '@/app/store/cartStore';
import { CartItem } from '@/app/types/cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(setItems);
    return () => { unsubscribe(); };
  }, []);

  return {
    items,
    addToCart: cartStore.addToCart.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
    removeFromCart: cartStore.removeFromCart.bind(cartStore),
    clearCart: cartStore.clearCart.bind(cartStore)
  };
} 