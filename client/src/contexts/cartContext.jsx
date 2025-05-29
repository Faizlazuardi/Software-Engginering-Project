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
        setCart(prev =>
        prev
            .map(item =>
            item.title === product.title
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)
        );
    };

    const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subTotal * 0.1;
    const total = subTotal + tax;

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, subTotal, tax, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
