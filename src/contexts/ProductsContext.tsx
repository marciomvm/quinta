import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, seedProducts } from '@/data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id'>>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(seedProducts);
        }
      })
      .catch(err => {
        console.error('Failed to fetch products from DB', err);
        setProducts(seedProducts);
      });
  }, []);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: crypto.randomUUID() };
    
    // 1. Update local state immediately for UI responsiveness
    setProducts((prev) => [...prev, newProduct]);
    
    // 2. Persist to DB
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (!res.ok) throw new Error('Failed to save product');
    } catch (e) {
      console.error('Failed to save to DB', e);
      // Optional: revert state if critical, but for this use case, logging is usually sufficient
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Omit<Product, 'id'>>) => {
    let updatedProduct: Product | undefined;
    
    // 1. Calculate and update local state
    setProducts((prev) => {
      const targetIndex = prev.findIndex(p => p.id === id);
      if (targetIndex === -1) return prev;
      
      const newProducts = [...prev];
      updatedProduct = { ...newProducts[targetIndex], ...updates } as Product;
      newProducts[targetIndex] = updatedProduct;
      return newProducts;
    });

    // 2. Persist updated product to DB
    if (updatedProduct) {
      try {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct)
        });
        if (!res.ok) throw new Error('Failed to update product');
      } catch (e) {
        console.error('Failed to update DB', e);
      }
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete from DB', e);
    }
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
