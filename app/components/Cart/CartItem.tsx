'use client';
import Image from 'next/image';
import { useCart } from '@/app/providers/CartProvider';
import { CartItem as CartItemType } from '@/app/types/cart';
import { BASE_URL } from '@/app/config/constants';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.title, newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      handleQuantityChange(value);
    }
  };

  const calculatePrice = (price: string | undefined, quantity: number) => {
    if (!price) return 0;
    return parseInt(price.replace(/\D/g, '')) * quantity;
  };

  return (
    <li className="py-5 border-y border-[#E5E5E5]">
      <div className="grid grid-cols-[64px_1fr_110px_100px] gap-4 items-center max-w-full">
        {/* Изображение товара */}
        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Информация о товаре */}
        <div className="min-w-0">
          <h2 className="text-[18px] leading-[23.4px] font-medium text-[#212529] truncate">
            {item.title}
          </h2>
          {item.description && (
            <h3 className="text-[13px] leading-[16.9px] text-[#212529] truncate">
              {Array.isArray(item.description) ? item.description.join(', ') : item.description}
            </h3>
          )}
        </div>

        {/* Контролы количества */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-5 h-5 flex items-center justify-center bg-[#CCCCCC] rounded-full overflow-hidden disabled:opacity-50"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="-m-1">
              <rect x="8" y="11" width="8" height="2" rx="1"/>
            </svg>
          </button>

          <input
            type="text"
            value={String(item.quantity)}
            onChange={handleInputChange}
            className="w-[38px] h-[27px] text-center text-[18px] font-medium text-[#212529]"
          />

          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-5 h-5 flex items-center justify-center bg-[#CCCCCC] rounded-full overflow-hidden"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="-m-1">
              <path d="M12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9C13 8.44772 12.5523 8 12 8Z"/>
            </svg>
          </button>
        </div>

        {/* Цена и кнопка удаления */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-[18px] font-medium text-[#212529] whitespace-nowrap">
            {calculatePrice(item.price, item.quantity)} ₽
          </span>

          <button
            onClick={() => removeFromCart(item.title)}
            className="w-5 h-5 flex items-center justify-center bg-[#CCCCCC] rounded-full overflow-hidden"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="-m-1">
              <path d="M9.1712 9.17157C8.78068 9.5621 8.78068 10.1953 9.1712 10.5858L10.5854 12L9.1712 13.4142C8.78068 13.8047 8.78068 14.4379 9.1712 14.8284C9.56172 15.219 10.1949 15.219 10.5854 14.8284L11.9996 13.4142L13.4138 14.8284C13.8044 15.219 14.4375 15.219 14.8281 14.8284C15.2186 14.4379 15.2186 13.8047 14.8281 13.4142L13.4138 12L14.8281 10.5858C15.2186 10.1953 15.2186 9.5621 14.8281 9.17157C14.4375 8.78105 13.8044 8.78105 13.4138 9.17157L11.9996 10.5858L10.5854 9.17157C10.1949 8.78105 9.56172 8.78105 9.1712 9.17157Z"/>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
} 