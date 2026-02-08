import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('crontor_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        localStorage.setItem('crontor_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: Math.min(item.quantity + 1, 50) }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });

        showNotification(`Añadido: ${product.name}`);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = Math.max(1, Math.min(item.quantity + delta, 50));
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isCartOpen,
        setIsCartOpen,
        notification
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            <div className={`notification-toast ${notification ? 'show' : ''}`}>
                <i className="fas fa-cart-plus"></i>
                <span>{notification}</span>
            </div>
        </CartContext.Provider>
    );
};
