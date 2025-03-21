'use client';
import Image from 'next/image';
import { useCart } from '@/app/providers/CartProvider';

export type ProductType = {
  image: {
    src: string;
    srcSet: {
      width: number;
      url: string;
    }[];
  };
  title: string;
  description: string[];
  price: string;
};

type ProductCardProps = {
  image: string;
  title: string;
  description: string[];
  price: string;
};

export const products: ProductType[] = [
  {
    image: {
      src: "/images/1085b5821a354b3c65fbc35b013ac9ae.webp",
      srcSet: [
        { width: 575, url: "/images/1085b5821a354b3c65fbc35b013ac9ae.webp?width=575" },
        { width: 767, url: "/images/1085b5821a354b3c65fbc35b013ac9ae.webp?width=767" },
        { width: 991, url: "/images/1085b5821a354b3c65fbc35b013ac9ae.webp?width=991" },
        { width: 1199, url: "/images/1085b5821a354b3c65fbc35b013ac9ae.webp" }
      ]
    },
    title: "Визитки 100 шт",
    description: [
      "Нанесение: одностороннее",
      "Макет не входит в стоимость",
      "Размер:90х50 мм"
    ],
    price: "756₽"
  },
  {
    image: {
      src: "/images/682ed895eab8f0e570982001e4176b1a.webp",
      srcSet: [
        { width: 575, url: "/images/682ed895eab8f0e570982001e4176b1a.webp?width=575" },
        { width: 767, url: "/images/682ed895eab8f0e570982001e4176b1a.webp?width=767" },
        { width: 991, url: "/images/682ed895eab8f0e570982001e4176b1a.webp?width=991" },
        { width: 1199, url: "/images/682ed895eab8f0e570982001e4176b1a.webp" }
      ]
    },
    title: "Печать автомат.",
    description: [
      "Размер: D-38 мм",
      "Автоматическая оснастка",
      "Чернила: синие"
    ],
    price: "1590₽"
  },
  {
    image: {
      src: "/images/fc149cd9b0c4f3bdb5298759e5dfd80a.webp",
      srcSet: [
        { width: 575, url: "/images/fc149cd9b0c4f3bdb5298759e5dfd80a.webp?width=575" },
        { width: 767, url: "/images/fc149cd9b0c4f3bdb5298759e5dfd80a.webp?width=767" },
        { width: 991, url: "/images/fc149cd9b0c4f3bdb5298759e5dfd80a.webp?width=991" },
        { width: 1199, url: "/images/fc149cd9b0c4f3bdb5298759e5dfd80a.webp" }
      ]
    },
    title: "Стикеры 3 листа А3",
    description: [
      "Форма: любая",
      "Количество: max в листе А3",
      "Бумага: самоклеющаяся"
    ],
    price: "795₽"
  },
  {
    image: {
      src: "/images/eb328670783e547129ad61e1c1fe5268.webp",
      srcSet: [
        { width: 575, url: "/images/eb328670783e547129ad61e1c1fe5268.webp?width=575" },
        { width: 767, url: "/images/eb328670783e547129ad61e1c1fe5268.webp?width=767" },
        { width: 991, url: "/images/eb328670783e547129ad61e1c1fe5268.webp?width=991" },
        { width: 1199, url: "/images/eb328670783e547129ad61e1c1fe5268.webp" }
      ]
    },
    title: "Табличка улица",
    description: [
      "Материал: металл",
      "Размер: 600х200 мм",
      "Макет в подарок"
    ],
    price: "1378₽"
  }
];

export default function ProductCard({ image, title, description, price }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Добавление в корзину:', {
      title,
      price,
      description,
      image: `https://klotoprint.ru${image}`,
      quantity: 1
    });
    
    addToCart({
      title,
      price,
      description,
      image: `https://klotoprint.ru${image}`,
      quantity: 1
    });
  };

  return (
    <div className="relative w-[255px] p-8 bg-white border border-black/[0.08] rounded-2xl">
      <div className="w-[189px] h-[190px] mb-2 relative">
        <Image
          src={`https://klotoprint.ru${image}`}
          alt={title}
          fill
          className="object-cover cursor-pointer"
          sizes="189px"
          quality={100}
        />
      </div>
      
      <h3 className="text-[18px] leading-[23.4px] font-medium text-black mb-2">
        {title}
      </h3>
      
      <div className="text-[13px] leading-[15.6px] font-medium text-black/40 mb-4">
        {description.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      
      <div className="text-[18px] leading-[23.4px] text-[#5552E8] mb-4">
        {price}
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="w-full h-[41px] flex items-center justify-center bg-[#5552E8] hover:bg-[#3936CC] text-white text-[15px] leading-[15px] rounded-md transition-colors"
      >
        Заказать
      </button>
    </div>
  );
} 