import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, photo?: string) => void;
  removeFromCart: (cartId: number) => void;
  updateQuantity: (cartId: number, change: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('infinityCart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('infinityCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string, color: string, photo?: string) => {
    setCart(prev => {
      // Find exact match (same id, size, color)
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color &&
        item.customPhoto === photo // Strict check on photo equality or null
      );

      if (existing) {
        return prev.map(item => 
          item.cartId === existing.cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      const newItem: CartItem = {
        ...product,
        cartId: Date.now(),
        quantity: 1,
        selectedSize: size,
        selectedColor: color,
        customPhoto: photo
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: number, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
