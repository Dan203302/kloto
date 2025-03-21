'use client';
import { useState } from 'react';
import { cartStore } from '@/app/store/cartStore';

type FormData = {
  name: string;
  phone: string;
  email: string;
  comment?: string;
  delivery: 'pickup' | '';
};

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

interface CartFormProps {
  onClose: () => void;
}

export default function CartForm({ onClose }: CartFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
    delivery: ''
  });
  const [maskedValue, setMaskedValue] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Минимум 2 символа' : '';
      case 'phone':
        return !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value) ? 'Введите корректный номер телефона' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Введите корректный email' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name !== 'comment') { // Не валидируем комментарий
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/\D/g, '');
    
    let maskedNumber = '';
    if (numbers.length > 0) {
      maskedNumber = '+7 ';
      if (numbers.length > 1) {
        maskedNumber += `(${numbers.slice(1, 4)}`;
      }
      if (numbers.length >= 4) {
        maskedNumber += `) ${numbers.slice(4, 7)}`;
      }
      if (numbers.length >= 7) {
        maskedNumber += `-${numbers.slice(7, 9)}`;
      }
      if (numbers.length >= 9) {
        maskedNumber += `-${numbers.slice(9, 11)}`;
      }
    }

    setMaskedValue(maskedNumber);
    setFormData(prev => ({ ...prev, phone: maskedNumber }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Проверяем все обязательные поля
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', maskedValue),
      email: validateField('email', formData.email)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error) || !formData.delivery) {
      return;
    }

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartStore.getItems(),
          formData: {
            ...formData,
            phone: maskedValue
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send order');
      }

      cartStore.clearCart();
      onClose();
    } catch (error) {
      console.error('Error sending order:', error);
      // Здесь можно добавить обработку ошибки, например, показать уведомление пользователю
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== 'comment') {
      const error = validateField(name, name === 'phone' ? maskedValue : value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
      <div className="mb-7 space-y-7">
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            className={`w-full h-[58px] px-4 text-[18px] text-[#212529] border-2 rounded-lg placeholder:text-[#CCCCCC] focus:text-[#212529] transition-colors
              ${isSubmitted && errors.name ? 'border-red-500' : 'border-[#CCCCCC] focus:border-[#5552E8]'}`}
          />
          {isSubmitted && errors.name && (
            <span className="absolute top-full left-0 mt-1 text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            placeholder="+7 (000) 000-0000"
            value={maskedValue}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            className={`w-full h-[58px] px-4 text-[18px] text-[#212529] border-2 rounded-lg placeholder:text-[#CCCCCC] focus:text-[#212529] transition-colors
              ${isSubmitted && errors.phone ? 'border-red-500' : 'border-[#CCCCCC] focus:border-[#5552E8]'}`}
          />
          {isSubmitted && errors.phone && (
            <span className="absolute top-full left-0 mt-1 text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-[58px] px-4 text-[18px] text-[#212529] border-2 rounded-lg placeholder:text-[#CCCCCC] focus:text-[#212529] transition-colors
              ${isSubmitted && errors.email ? 'border-red-500' : 'border-[#CCCCCC] focus:border-[#5552E8]'}`}
          />
          {isSubmitted && errors.email && (
            <span className="absolute top-full left-0 mt-1 text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="comment"
            placeholder="Комментарий к заказу"
            value={formData.comment}
            onChange={handleChange}
            className="w-full h-[58px] px-4 text-[18px] text-[#212529] border-2 border-[#CCCCCC] rounded-lg placeholder:text-[#CCCCCC] focus:text-[#212529] focus:border-[#5552E8] transition-colors"
          />
        </div>
      </div>

      {/* Способ доставки */}
      <div className="mb-10">
        <h3 className="text-[18px] leading-[23.4px] mb-4 text-[#212529]">
          Способ доставки
        </h3>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="delivery"
            value="pickup"
            checked={formData.delivery === 'pickup'}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              delivery: e.target.checked ? 'pickup' : '' 
            }))}
            className="hidden"
          />
          <div className={`relative w-6 h-6 border-2 rounded-full mr-2 ${
            isSubmitted && !formData.delivery ? 'border-red-500' : 'border-[#CCCCCC]'
          }`}>
            {formData.delivery === 'pickup' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#5552E8] rounded-full" />
            )}
          </div>
          <span className="text-[18px] leading-[23.4px] text-[#212529]">Самовывоз</span>
        </label>
        {isSubmitted && !formData.delivery && (
          <span className="block mt-1 text-red-500 text-sm">Выберите способ доставки</span>
        )}
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        className="w-full h-14 bg-[#FB8C00] text-white text-[18px] leading-[18px] rounded-md hover:bg-[#f57c00] transition-colors"
      >
        Оформить заказ
      </button>
    </form>
  );
} 