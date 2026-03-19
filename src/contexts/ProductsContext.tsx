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
    setProducts((prev) => [...prev, newProduct]);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
    } catch (e) {
      console.error('Failed to save to DB', e);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Omit<Product, 'id'>>) => {
    let updated: Product | undefined;
    setProducts((prev) => prev.map((p) => {
      if (p.id === id) {
        updated = { ...p, ...updates } as Product;
        return updated;
      }
      return p;
    }));

    if (updated) {
      try {
        await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
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
