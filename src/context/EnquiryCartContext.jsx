'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const EnquiryCartContext = createContext(null);

const STORAGE_KEY = 'pharmavive_enquiry_cart_v1';

export function EnquiryCartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load enquiry cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save enquiry cart to localStorage:', e);
    }
  }, [cart, isLoaded]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addToCart = useCallback((product, options = {}) => {
    if (!product || !product._id) return;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item._id === product._id);
      if (existingIndex > -1) {
        // Increment or update
        const updated = [...prev];
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          quantity: options.quantity ? options.quantity : current.quantity + 1,
          packSize: options.packSize || current.packSize || '50mg',
          notes: options.notes !== undefined ? options.notes : current.notes,
        };
        return updated;
      }

      // Add new item
      const newItem = {
        _id: product._id,
        name: product.name,
        catNumber: product.catNumber || '',
        casNumber: product.casNumber || '',
        chemicalName: product.chemicalName || '',
        molecularFormula: product.molecularFormula || '',
        molecularWeight: product.molecularWeight || '',
        purity: product.purity || '',
        stock: product.stock || 'Instock',
        image: product.image || '',
        structureType: product.structureType || options.structureType || '',
        quantity: options.quantity || 1,
        packSize: options.packSize || '50mg',
        unit: options.unit || 'mg',
        notes: options.notes || '',
        subCategorySlug: product.subCategory?.slug || '',
        productSlug: product.slug || '',
      };
      return [...prev, newItem];
    });

    // Auto-open drawer on addition if requested
    if (options.autoOpen !== false) {
      setIsOpen(true);
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity, packSize) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          return {
            ...item,
            quantity: Math.max(1, parseInt(quantity, 10) || 1),
            ...(packSize ? { packSize } : {}),
          };
        }
        return item;
      })
    );
  }, []);

  const updateNotes = useCallback((productId, notes) => {
    setCart((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, notes } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback((productId) => {
    return cart.some((item) => item._id === productId);
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  const addItem = useCallback((product, packSizeOrOpts, quantity) => {
    if (typeof packSizeOrOpts === 'object') {
      addToCart(product, packSizeOrOpts);
    } else {
      addToCart(product, { packSize: packSizeOrOpts || '50mg', quantity: quantity || 1 });
    }
  }, [addToCart]);

  const contextValue = useMemo(
    () => ({
      cart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      addItem,
      removeFromCart,
      updateQuantity,
      updateNotes,
      clearCart,
      isInCart,
      totalItems,
    }),
    [
      cart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      addItem,
      removeFromCart,
      updateQuantity,
      updateNotes,
      clearCart,
      isInCart,
      totalItems,
    ]
  );

  return (
    <EnquiryCartContext.Provider value={contextValue}>
      {children}
    </EnquiryCartContext.Provider>
  );
}

export function useEnquiryCart() {
  const context = useContext(EnquiryCartContext);
  if (!context) {
    throw new Error('useEnquiryCart must be used within an EnquiryCartProvider');
  }
  return context;
}
