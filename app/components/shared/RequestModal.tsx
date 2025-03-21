'use client';
import { useEffect, useRef, useState } from 'react';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

type FormData = {
  name: string;
  phone: string;
  email: string;
  comment: string;
  delivery: 'pickup' | '';
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function RequestModal({ isOpen, onClose, productTitle }: RequestModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Минимум 2 символа' : '';
      case 'phone':
        return !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value) ? 'Введите корректный номер телефона' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Введите корректный email' : '';
      case 'comment':
        return value.length < 10 ? 'Минимум 10 символов' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
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

    // Проверяем все поля
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', maskedValue),
      email: validateField('email', formData.email),
      comment: validateField('comment', formData.comment)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error) || !formData.delivery) {
      return;
    }

    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productTitle,
          formData: {
            ...formData,
            phone: maskedValue
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      onClose();
    } catch (error) {
      console.error('Error sending request:', error);
      // Здесь можно добавить обработку ошибки, например, показать уведомление пользователю
    }
  };

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
        <h2 className="text-[32px] leading-[35.2px] font-bold text-[#212529] mb-8 text-center">
          Закажи онлайн
        </h2>

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
              <textarea
                name="comment"
                placeholder="Комментарий к заказу"
                value={formData.comment}
                onChange={handleChange}
                className={`w-full h-[116px] px-4 py-4 text-[18px] text-[#212529] border-2 rounded-lg placeholder:text-[#CCCCCC] focus:text-[#212529] transition-colors resize-none
                  ${isSubmitted && errors.comment ? 'border-red-500' : 'border-[#CCCCCC] focus:border-[#5552E8]'}`}
              />
              {isSubmitted && errors.comment && (
                <span className="absolute top-full left-0 mt-1 text-red-500 text-sm">{errors.comment}</span>
              )}
            </div>

            {/* Способ доставки */}
            <div className="space-y-4">
              <h3 className="text-[18px] leading-[23.4px] text-[#212529]">
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
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full h-14 bg-[#FB8C00] text-white text-[18px] leading-[18px] rounded-md hover:bg-[#f57c00] transition-colors"
          >
            Отправить заявку
          </button>
        </form>

        {/* Текст о соглашении */}
        <div className="text-[13px] md:text-[15px] leading-[1.3] text-[#212529] mt-4">
          Оставляя заявку, вы соглашаетесь на{' '}
          <a href="/" className="underline text-[#212529]">
            обработку персональных данных
          </a>
        </div>
      </div>
    </div>
  );
} 