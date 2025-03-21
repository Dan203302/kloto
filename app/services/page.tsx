'use client';
import { Suspense } from 'react';
import { CartProvider } from '@/app/providers/CartProvider';
import Services from './Services/Services';

export default function ServicesPage() {
  return (
    <CartProvider>
      <Suspense>
        <Services />
      </Suspense>
    </CartProvider>
  );
} 