'use client';
import { useState } from 'react';

export function usePhoneMask() {
  const [maskedValue, setMaskedValue] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    if (!value) {
      setMaskedValue('');
      return;
    }

    let formattedValue = '+7';
    if (value.length > 1) {
      formattedValue += ` (${value.slice(1, 4)}`;
    }
    if (value.length > 4) {
      formattedValue += `) ${value.slice(4, 7)}`;
    }
    if (value.length > 7) {
      formattedValue += `-${value.slice(7, 9)}`;
    }
    if (value.length > 9) {
      formattedValue += `-${value.slice(9, 11)}`;
    }

    setMaskedValue(formattedValue);
  };

  return {
    maskedValue,
    handlePhoneChange
  };
} 