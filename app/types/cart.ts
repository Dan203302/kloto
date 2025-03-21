export interface CartItem {
  title: string;
  image: string;
  description: string[];
  price: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (title: string, quantity: number) => void;
  removeFromCart: (title: string) => void;
  clearCart: () => void;
}

export type Cart = {
  items: CartItem[];
  totalItems: number;
}; 