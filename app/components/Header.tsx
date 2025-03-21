'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Предотвращаем скролл при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleServicesClick = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const handleServiceClick = (service: string) => {
    setIsServicesOpen(false);
    const sectionId = service.toLowerCase().replace(/\s+/g, '-');
    router.push(`/services#${sectionId}`);
  };

  return (
    <div className="relative bg-white">
      <header className="max-w-[1200px] mx-auto px-5 lg:px-10 py-7">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={handleHomeClick} className="block">
            <div className="relative w-[120px] h-[38px] lg:w-[137px] lg:h-[44px]">
              <Image
                src="https://klotoprint.ru/images/06207f65694be544fc50d5d13927c51b.webp"
                alt="Логотип"
                fill
                className="object-contain cursor-pointer"
                sizes="(max-width: 768px) 120px, 137px"
                quality={100}
                priority
              />
            </div>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden lg:flex items-center gap-8">
            <nav>
              <ul className="flex items-center gap-8">
                <li>
                  <Link href="/" onClick={handleHomeClick} className="text-[18px] leading-[23.4px] text-black/70 hover:text-black font-[450]">
                    Главная
                  </Link>
                </li>
                <li className="relative">
                  <button
                    ref={buttonRef}
                    className="flex items-center text-[18px] leading-[23.4px] text-black/70 hover:text-black font-[450]"
                    onClick={handleServicesClick}
                    onMouseEnter={() => setIsServicesOpen(true)}
                  >
                    Услуги
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="ml-1">
                      <path fill="currentColor" d="M12.0013 15.9993C11.7676 15.9998 11.5412 15.9184 11.3613 15.7693L6.36125 11.7693C6.15704 11.5996 6.02861 11.3556 6.00423 11.0912C5.97985 10.8268 6.06151 10.5635 6.23125 10.3593C6.40099 10.1551 6.6449 10.0267 6.90933 10.0023C7.17375 9.9779 7.43704 10.0596 7.64125 10.2293L12.0013 13.7093L16.3613 10.3893C16.4635 10.3062 16.5812 10.2442 16.7076 10.2068C16.8339 10.1693 16.9664 10.1572 17.0974 10.1712C17.2285 10.1851 17.3554 10.2248 17.4711 10.288C17.5867 10.3512 17.6887 10.4366 17.7713 10.5393C17.8628 10.6421 17.9322 10.7627 17.975 10.8936C18.0178 11.0245 18.0331 11.1628 18.0199 11.2999C18.0068 11.4369 17.9655 11.5698 17.8986 11.6902C17.8317 11.8105 17.7407 11.9158 17.6313 11.9993L12.6313 15.8293C12.4462 15.9548 12.2244 16.0147 12.0013 15.9993Z"/>
                    </svg>
                  </button>
                  
                  {isServicesOpen && (
                    <div
                      ref={dropdownRef}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 bg-white rounded-2xl shadow-[0_0_7px_0_rgba(33,33,33,0.2)] p-8 w-[280px] max-h-[640px] overflow-auto z-50"
                    >
                      <ul className="space-y-4">
                        {['Полиграфия', 'Брендирование', 'Широкоформатная печать', 'Рекламные конструкции'].map((service) => (
                          <li key={service}>
                            <button 
                              onClick={() => handleServiceClick(service)}
                              className="text-[18px] leading-[23.4px] text-black/70 hover:text-black block font-[450] w-full text-left"
                            >
                              {service}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <Link href="/delivery" className="text-[18px] leading-[23.4px] text-black/70 hover:text-black font-[450]">
                    Оплата и доставка
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[18px] leading-[23.4px] text-black/70 hover:text-black font-[450]">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="text-[18px] leading-[23.4px] text-black/70 hover:text-black font-[450]">
                    Контакты
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="text-right">
              <div className="text-[13px] leading-[16.9px] text-black/40 mb-1 font-[450]">
                по будням с 10.00 до 18.00
              </div>
              <div className="text-[18px] leading-[23.4px] font-bold text-black/70">
                +7 (926) 382-89-76
              </div>
            </div>
          </div>

          {/* Мобильная кнопка меню */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-black/70 text-black/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="currentColor">
                <path d="M4 8C3.44772 8 3 8.44772 3 9C3 9.55228 3.44772 10 4 10H20C20.5523 10 21 9.55228 21 9C21 8.44772 20.5523 8 20 8H4ZM4 14C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16H20C20.5523 16 21 15.5523 21 15C21 14.4477 20.5523 14 20 14H4Z" fillRule="evenodd" clipRule="evenodd"/>
              </g>
            </svg>
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed top-0 right-0 w-[280px] h-full bg-white p-[32px_32px_32px_32px] pt-[76px] transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Кнопка закрытия */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-7 right-8 w-10 h-10 flex items-center justify-center rounded-full border border-black/70 text-black/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="currentColor">
                <path d="M6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L12 10.5858L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L13.4142 12L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L12 13.4142L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L10.5858 12L6.29289 7.70711Z" fillRule="evenodd" clipRule="evenodd"/>
              </g>
            </svg>
          </button>

          {/* Мобильное меню */}
          <nav className="mb-10">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  onClick={(e) => {
                    handleHomeClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[16px] leading-[24px] text-black/70 hover:text-black block font-[450]"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] leading-[24px] text-black/70 hover:text-black block font-[450]"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link 
                  href="/delivery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] leading-[24px] text-black/70 hover:text-black block font-[450]"
                >
                  Оплата и доставка
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] leading-[24px] text-black/70 hover:text-black block font-[450]"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] leading-[24px] text-black/70 hover:text-black block font-[450]"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </nav>

          {/* Контактная информация в мобильном меню */}
          <div>
            <div className="text-[13px] leading-[16.9px] text-black/40 mb-1 font-[450]">
              по будням с 10.00 до 18.00
            </div>
            <div className="text-[15px] leading-[19.5px] font-bold text-black/70">
              +7 (926) 382-89-76
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}