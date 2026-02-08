import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function CartModal() {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart
    } = useCart();
    const { currentUser } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isCartOpen) return null;

    const handleCheckout = async () => {
        if (!currentUser) {
            alert('Debes iniciar sesión para realizar la compra');
            return;
        }

        if (cart.length === 0) return;

        setIsProcessing(true);
        try {
            const response = await axios.post(`${API_URL}/payments/create-basket`, {
                username: currentUser,
                items: cart.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category || 'unknown'
                }))
            });

            if (response.data.checkout_url) {
                // Not clear cart here yet, Tebex handles the basket.
                // We'll clear it after redirecting or on success page
                window.location.href = response.data.checkout_url;
            } else {
                alert('Error al crear el carrito de pago. Inténtalo de nuevo.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error al conectar con el servidor de pagos. Inténtalo de nuevo.');
            setIsProcessing(false);
        }
    };

    const cartTotal = getCartTotal();
    const usdTotal = (cartTotal / 900).toFixed(2);

    return (
        <div className="cart-modal-container">
            <div className="modal-overlay" onClick={() => setIsCartOpen(false)}></div>
            <div className="cart-modal glass-card animate-slide-up">
                {/* Header Section */}
                <div className="cart-header">
                    <div className="cart-header-title">
                        <div className="cart-icon-wrapper">
                            <i className="fas fa-shopping-basket"></i>
                        </div>
                        <div className="cart-title-text">
                            <h2>Tu Carrito</h2>
                            <span className="cart-subtitle">{cart.length} {cart.length === 1 ? 'item' : 'items'} seleccionados</span>
                        </div>
                    </div>
                    <button className="cart-close" onClick={() => setIsCartOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Items Section */}
                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <div className="empty-cart-view animate-fade-in">
                            <div className="empty-icon">
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <h3>Tu carrito está vacío</h3>
                            <p>¡Explora la tienda y añade algunos tesoros!</p>
                            <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                                Volver a la Tienda
                            </button>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item-card animate-slide-in">
                                    <div className="cart-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <h4 className="cart-item-name">{item.name}</h4>
                                        <span className="cart-item-category">{item.category || 'Producto'}</span>
                                        <div className="cart-item-price-row">
                                            <span className="price-tag">${item.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="cart-item-actions-premium">
                                        <div className="premium-qty-selector">
                                            <button className="qty-action minus" onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="qty-number">{item.quantity}</span>
                                            <button className="qty-action plus" onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <button className="item-delete-btn" onClick={() => removeFromCart(item.id)} title="Eliminar item">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                {cart.length > 0 && (
                    <div className="cart-premium-footer">
                        <div className="cart-summary-premium">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${cartTotal.toLocaleString()} CLP</span>
                            </div>
                            <div className="summary-row total-row">
                                <div className="total-label">
                                    <span>Total Final</span>
                                    <small>Aprox. en USD</small>
                                </div>
                                <div className="total-amount-box">
                                    <span className="clp-total">${cartTotal.toLocaleString()}</span>
                                    <span className="usd-total">${usdTotal} USD</span>
                                </div>
                            </div>
                        </div>

                        <div className="cart-footer-actions">
                            <button
                                className="btn btn-hero btn-checkout-premium"
                                onClick={handleCheckout}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Procesando...
                                    </>
                                ) : (
                                    <>
                                        Proceder al Pago <i className="fas fa-arrow-right"></i>
                                    </>
                                )}
                            </button>
                            <p className="tebex-secure-note">
                                <i className="fas fa-lock"></i> Pago seguro vía Tebex Checkout
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
