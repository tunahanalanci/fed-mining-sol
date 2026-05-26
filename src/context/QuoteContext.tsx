'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BasketItem {
  id: string;
  partNumber: string;
  name: string;
  brand: string;
  category: string;
  oemReference: string | null;
  quantity: number;
}

interface QuoteContextType {
  basket: BasketItem[];
  addToBasket: (part: any, quantity?: number) => void;
  removeFromBasket: (partId: string) => void;
  updateQuantity: (partId: string, quantity: number) => void;
  clearBasket: () => void;
  isBasketOpen: boolean;
  setIsBasketOpen: (open: boolean) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // Load basket from localStorage
  useEffect(() => {
    const savedBasket = localStorage.getItem('fed_quote_basket');
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (e) {
        console.error('Failed to parse quote basket from localStorage', e);
      }
    }
  }, []);

  // Save basket to localStorage
  const saveBasket = (newBasket: BasketItem[]) => {
    setBasket(newBasket);
    localStorage.setItem('fed_quote_basket', JSON.stringify(newBasket));
  };

  const addToBasket = (part: any, quantity = 1) => {
    const existingIndex = basket.findIndex((item) => item.id === part.id);
    const updatedBasket = [...basket];

    if (existingIndex >= 0) {
      updatedBasket[existingIndex].quantity += quantity;
    } else {
      updatedBasket.push({
        id: part.id,
        partNumber: part.partNumber,
        name: part.name,
        brand: part.brand,
        category: part.category,
        oemReference: part.oemReference || null,
        quantity: quantity,
      });
    }

    saveBasket(updatedBasket);
    setIsBasketOpen(true); // Open the sidebar drawer automatically when adding
  };

  const removeFromBasket = (partId: string) => {
    const updatedBasket = basket.filter((item) => item.id !== partId);
    saveBasket(updatedBasket);
  };

  const updateQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(partId);
      return;
    }
    const updatedBasket = basket.map((item) =>
      item.id === partId ? { ...item, quantity } : item
    );
    saveBasket(updatedBasket);
  };

  const clearBasket = () => {
    saveBasket([]);
  };

  return (
    <QuoteContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
        isBasketOpen,
        setIsBasketOpen,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
