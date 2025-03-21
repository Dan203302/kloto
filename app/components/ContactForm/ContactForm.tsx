'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  description?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Обязательное поле';
      isValid = false;
    }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 11) {
      newErrors.phone = 'Введите полный номер телефона';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Обязательное поле';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Обязательное поле';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatPhoneNumber = (value: string): string => {
    // Убираем все нецифровые символы и +7
    const numbers = value.replace(/\D/g, '').replace(/^7/, '');
    
    // Ограничиваем до 10 цифр
    const trimmed = numbers.slice(0, 10);
    
    // Форматируем номер
    if (trimmed.length === 0) return '+7';
    if (trimmed.length <= 3) return `+7 (${trimmed}`;
    if (trimmed.length <= 6) return `+7 (${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
    return `+7 (${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let formatted = formatPhoneNumber(e.target.value);
    // Если пользователь пытается стереть +7, восстанавливаем его
    if (formatted.length < 2) formatted = '+7';
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/send-question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            question: formData.description
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send question');
        }

        // Очищаем форму после успешной отправки
        setFormData({
          name: '',
          phone: '',
          email: '',
          description: ''
        });
        setErrors({});
      } catch (error) {
        console.error('Error sending question:', error);
      }
    }
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Заголовок */}
        <h2 className="text-[48px] leading-[52.8px] font-bold text-black text-center mb-4">
          Остались вопросы?
        </h2>

        {/* Подзаголовок */}
        <div className="text-[18px] leading-[23.4px] text-black/70 text-center mb-10">
          <p>Не вся продукция которую мы производим представлена на сайте.</p>
          <p>Если не нашли желаемой позиции, оставьте запрос ниже,</p>
          <p>менеджер свяжется для уточнения деталей, расчета стоимости и сроков</p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-center gap-[6px] mb-4 max-w-[900px] mx-auto px-5 lg:px-0">
          <div className="flex flex-col w-full lg:w-[216.688px]">
            <input
              type="text"
              placeholder="Ваше имя"
              className={`h-[58px] px-4 text-[18px] text-black border-2 ${
                errors.name ? 'border-red-500' : 'border-[#CCCCCC]'
              } rounded-lg focus:border-[#5552E8] transition-colors`}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            {errors.name && <span className="text-red-500 text-[12px] mt-1">{errors.name}</span>}
          </div>

          <div className="flex flex-col w-full lg:w-[216.688px]">
            <input
              type="tel"
              placeholder="+7 (495) 888-0000"
              className={`h-[58px] px-4 text-[18px] text-black border-2 ${
                errors.phone ? 'border-red-500' : 'border-[#CCCCCC]'
              } rounded-lg focus:border-[#5552E8] transition-colors`}
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && <span className="text-red-500 text-[12px] mt-1">{errors.phone}</span>}
          </div>

          <div className="flex flex-col w-full lg:w-[216.688px]">
            <input
              type="email"
              placeholder="E-mail"
              className={`h-[58px] px-4 text-[18px] text-black border-2 ${
                errors.email ? 'border-red-500' : 'border-[#CCCCCC]'
              } rounded-lg focus:border-[#5552E8] transition-colors`}
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            {errors.email && <span className="text-red-500 text-[12px] mt-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col w-full lg:w-[216.688px]">
            <input
              type="text"
              placeholder="Описание запроса на расчет"
              className={`h-[58px] px-4 text-[18px] text-black border-2 ${
                errors.description ? 'border-red-500' : 'border-[#CCCCCC]'
              } rounded-lg focus:border-[#5552E8] transition-colors`}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            {errors.description && <span className="text-red-500 text-[12px] mt-1">{errors.description}</span>}
          </div>

          <button
            type="submit"
            className="h-[56px] w-full lg:w-[197.234px] bg-[#5552E8] hover:bg-[#3936CC] text-white text-[18px] rounded-md transition-colors flex items-center justify-center"
          >
            <span className="w-[197px] text-center">Оставить заявку</span>
          </button>
        </form>

        {/* Текст о персональных данных */}
        <div className="text-[15px] leading-[19.5px] text-black/70 text-center">
          Оставляя заявку, вы соглашаетесь на{' '}
          <Link href="/" className="text-[#5552E8] underline hover:text-[#3936CC] transition-colors">
            обработку персональных данных
          </Link>
        </div>
      </div>
    </div>
  );
} 