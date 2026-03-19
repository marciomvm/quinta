import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, seedProducts } from '@/data/products';

const STORAGE_KEY = 'quinta_products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Product[]) : seedProducts;
    } catch {
      return seedProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // localStorage may be unavailable (private mode, quota exceeded)
    }
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    setProducts((prev) => [
      ...prev,
      { ...product, id: String(Date.now()) },
    ]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Omit<Product, 'id'>>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};
