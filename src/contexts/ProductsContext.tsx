import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, seedProducts } from '@/data/products';
import { toast } from 'sonner';

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
    console.log('📦 [ProductsContext] addProduct triggered:', { 
      id: newProduct.id, 
      name: newProduct.name,
      imageSize: newProduct.imageUrl?.length || 0 
    });
    
    setProducts((prev) => [...prev, newProduct]);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      console.log('✅ [ProductsContext] addProduct response:', data);
      if (!res.ok) throw new Error(data.error || data.message || 'Failed to save');
    } catch (e) {
      console.error('❌ [ProductsContext] addProduct error:', e);
      toast.error('Erro ao guardar ferramenta: ' + (e instanceof Error ? e.message : 'Erro desconhecido'));
    }
  }, []);

  const updateProduct = useCallback(async (id: string, updates: Partial<Omit<Product, 'id'>>) => {
    let updatedProduct: Product | undefined;
    
    setProducts((prev) => {
      const targetIndex = prev.findIndex(p => p.id === id);
      if (targetIndex === -1) return prev;
      
      const newProducts = [...prev];
      updatedProduct = { ...newProducts[targetIndex], ...updates } as Product;
      newProducts[targetIndex] = updatedProduct;
      return newProducts;
    });

    if (updatedProduct) {
      console.log('📝 [ProductsContext] updateProduct triggered:', { 
        id, 
        name: updatedProduct.name, 
        imageSize: updatedProduct.imageUrl?.length || 0 
      });
      try {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        console.log('✅ [ProductsContext] updateProduct response:', data);
        if (!res.ok) throw new Error(data.error || data.message || 'Failed to update');
      } catch (e) {
        console.error('❌ [ProductsContext] updateProduct error:', e);
        toast.error('Erro ao atualizar ferramenta: ' + (e instanceof Error ? e.message : 'Erro desconhecido'));
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
