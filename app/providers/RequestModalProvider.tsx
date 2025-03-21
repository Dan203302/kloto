'use client';
import { createContext, useContext, useState } from 'react';
import RequestModal from '@/app/components/shared/RequestModal';

type RequestModalContextType = {
  openRequestModal: (productTitle: string) => void;
};

const RequestModalContext = createContext<RequestModalContextType | undefined>(undefined);

export function RequestModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productTitle, setProductTitle] = useState('');

  const openRequestModal = (title: string) => {
    setProductTitle(title);
    setIsOpen(true);
  };

  return (
    <RequestModalContext.Provider value={{ openRequestModal }}>
      {children}
      <RequestModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productTitle={productTitle}
      />
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  const context = useContext(RequestModalContext);
  if (!context) {
    throw new Error('useRequestModal must be used within RequestModalProvider');
  }
  return context;
} 