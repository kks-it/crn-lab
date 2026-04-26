import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("crnLabCart");
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("crnLabCart", JSON.stringify(items));
  }, [items]);

  function addItem(medTest) {
    setItems((current) => {
      if (current.some((item) => item.id === medTest.id)) {
        return current;
      }
      return [...current, medTest];
    });
    setIsCartOpen(true);
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
    setIsCartOpen(false);
  }

  const cartTotal = items.reduce((total, item) => total + Number(item.price || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount: items.length,
        cartTotal,
        isCartOpen,
        addItem,
        removeItem,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
