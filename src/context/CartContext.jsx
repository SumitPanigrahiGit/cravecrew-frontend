import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cc_cart');
    return stored ? JSON.parse(stored) : { items: [], chefId: null, chefName: '' };
  });

  useEffect(() => {
    localStorage.setItem('cc_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish, chef) => {
    setCart(prev => {
      // If different chef, clear cart first
      if (prev.chefId && prev.chefId !== chef._id) {
        if (!confirm(`Your cart has items from ${prev.chefName}. Clear cart to add from ${chef.kitchenName}?`)) {
          return prev;
        }
        return {
          items: [{ ...dish, quantity: 1 }],
          chefId: chef._id,
          chefName: chef.kitchenName
        };
      }
      const existing = prev.items.find(i => i._id === dish._id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(i => i._id === dish._id ? { ...i, quantity: i.quantity + 1 } : i)
        };
      }
      return {
        items: [...prev.items, { ...dish, quantity: 1 }],
        chefId: chef._id,
        chefName: chef.kitchenName || chef.name
      };
    });
  };

  const removeFromCart = (dishId) => {
    setCart(prev => {
      const items = prev.items.filter(i => i._id !== dishId);
      return items.length === 0 ? { items: [], chefId: null, chefName: '' } : { ...prev, items };
    });
  };

  const updateQuantity = (dishId, qty) => {
    if (qty < 1) { removeFromCart(dishId); return; }
    setCart(prev => ({
      ...prev,
      items: prev.items.map(i => i._id === dishId ? { ...i, quantity: qty } : i)
    }));
  };

  const clearCart = () => setCart({ items: [], chefId: null, chefName: '' });

  const cartTotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
