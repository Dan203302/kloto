'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ServiceHeader from './ServiceHeader';
import ServiceProducts from './ServiceProducts';
import ServiceProductGrid from './ServiceProductGrid';
import { servicesData } from './servicesData';

export default function Services() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      const sectionId = section.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [searchParams]);

  console.log('Sections:', servicesData.printing.sections);

  return (
    <div>
      {servicesData.printing.sections.map((section, index, sections) => {
        if (section.header) {
          console.log('Registering section:', section.header.title);
        }
        
        // Проверяем, является ли секция одной из последних двух с productsGrid
        const isLastTwoGrids = 
          section.productsGrid && 
          (index === sections.length - 1 || index === sections.length - 3);
        
        // Создаем id для секции из заголовка
        const sectionId = section.header?.title.toLowerCase().replace(/\s+/g, '-');
        
        return (
          <div 
            key={index}
            id={sectionId}
          >
            {section.header && (
              <ServiceHeader {...section.header} />
            )}
            
            {section.products && (
              <ServiceProducts {...section.products} />
            )}
            
            {section.productsGrid && section.productsGrid.products && (
              <ServiceProductGrid 
                products={section.productsGrid.products}
              />
            )}
          </div>
        );
      })}
    </div>
  );
} 