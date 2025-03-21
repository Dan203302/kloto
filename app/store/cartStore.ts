'use client';
import { CartItem } from '@/app/types/cart';

const CART_STORAGE_KEY = 'klotoprint_cart';

class CartStore {
  private items: CartItem[] = [];
  private listeners: Set<(items: CartItem[]) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          this.items = cartData.items || [];
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.items));
  }

  subscribe(listener: (items: CartItem[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getItems() {
    return this.items;
  }

  addToCart(item: CartItem) {
    const existingItem = this.items.find(i => i.title === item.title);
    
    if (existingItem) {
      existingItem.quantity += 1;
      console.log(`Увеличено количество "${item.title}" в корзине:`, existingItem.quantity);
    } else {
      this.items.push({ ...item, quantity: 1 });
      console.log(`Добавлен новый товар в корзину:`, item.title);
    }
    
    this.saveToStorage();
    this.notify();
  }

  updateQuantity(title: string, quantity: number) {
    this.items = this.items.map(item =>
      item.title === title ? { ...item, quantity } : item
    );
    this.saveToStorage();
    this.notify();
  }

  removeFromCart(title: string) {
    this.items = this.items.filter(item => item.title !== title);
    this.saveToStorage();
    this.notify();
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem(CART_STORAGE_KEY);
    this.notify();
  }

  private saveToStorage() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: this.items }));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }
}

export const cartStore = new CartStore(); 