'use client';

type ServiceHeaderProps = {
  title: string;
  items: string[];
  backgroundImage: string;
  height?: number;
};

export default function ServiceHeader({ 
  title, 
  items, 
  backgroundImage,
  height = 507
}: ServiceHeaderProps) {
  return (
    <div 
      className="relative w-full"
      style={{ 
        height: height === 507 
          ? 'min(507px, 100vh)'   // Для первого хедера
          : height === 410
            ? 'min(410px, 80vh)'  // Для хедеров с высотой 410
            : 'min(350px, 70vh)'  // Для остальных хедеров
      }}
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img
          src={`https://klotoprint.ru${backgroundImage}`}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Контент */}
      <div className="relative h-full max-w-[1200px] mx-auto px-5 lg:px-10 flex flex-col justify-center">
        <div className="max-w-[825px]">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] leading-[1.1] font-bold text-white mb-4 lg:mb-6">
            {title}
          </h1>
          
          <div className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] leading-[1.3] text-white/70 mb-6 lg:mb-10">
            {items.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2">-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 