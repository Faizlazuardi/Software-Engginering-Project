import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "cart") {
                setCart(JSON.parse(event.newValue || "[]"));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.title === product.title);
            if (existing) {
                return prev.map(item =>
                    item.title === product.title
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.title === product.title);
            if (existing && existing.quantity > 1) {
                return prev.map(item =>
                    item.title === product.title
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prev.filter(item => item.title !== product.title);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subTotal * 0.10;
    const total = subTotal + tax;

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        subTotal,
        tax,
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};