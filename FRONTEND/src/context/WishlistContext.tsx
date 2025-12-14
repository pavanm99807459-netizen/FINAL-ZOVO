import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(p => p.id === productId);
  }, [items]);

  const toggleWishlist = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist]);

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
