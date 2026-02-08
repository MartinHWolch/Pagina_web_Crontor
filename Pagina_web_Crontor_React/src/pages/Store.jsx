import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Products data
const products = {
    rangos: [
        { id: 'caballero', name: 'Caballero', price: 5000, image: '/assets/Caballero.png', badge: 'Nivel 1', features: ['Kit de Hierro Completo', 'Espada Reforzada', 'Prefijo [Caballero]', 'Acceso a zona VIP'], className: 'rank-caballero' },
        { id: 'conde', name: 'Conde', price: 10000, image: '/assets/Conde.png', badge: 'Nivel 2', features: ['Todo lo anterior +', 'Mascota: Lobo de Nieve', 'Comando /workbench', 'Kit semanal mejorado'], className: 'rank-conde' },
        { id: 'duque', name: 'Duque', price: 20000, image: '/assets/Duque.png', badge: 'Nivel 3', features: ['Vuelo en Lobby /fly', 'Comando /enderchest', 'Mascota legendaria', 'Chat con colores'], className: 'rank-duque' },
        { id: 'soberano', name: 'Soberano', price: 35000, image: '/assets/Soberano.png', badge: 'Máximo', features: ['Kit de Torio (Legendario)', 'Vuelo en Survival', 'Acceso a betas cerradas', 'Todas las ventajas anteriores'], className: 'rank-soberano', premium: true },
    ],
    tierras: [
        { id: 'terreno-small', name: 'Terreno Pequeño', price: 2000, image: '/assets/terreno_pequeño.png', description: 'Perfecto para comenzar tu aventura. 36 bloques de espacio.' },
        { id: 'terreno-medium', name: 'Terreno Mediano', price: 5000, image: '/assets/terreno_mediano.png', description: 'Espacio ideal para construcciones medianas. 400 bloques.' },
        { id: 'terreno-large', name: 'Terreno Grande', price: 12000, image: '/assets/terreno_grande.png', description: 'Para grandes proyectos. 1,600 bloques de construcción.' },
        { id: 'terreno-mega', name: 'Terreno Mega', price: 25000, image: '/assets/terreno_mega.png', description: 'El terreno definitivo. 3,600 bloques para tus sueños más grandes.', badge: 'Mega', premium: true },
    ],
    monedas: [
        { id: 'coins-100', name: '100 Monedas', price: 1000, image: '/assets/moneda1.png', description: 'Paquete inicial para comenzar.', className: 'coin-image' },
        { id: 'coins-500', name: '500 Monedas', price: 4500, image: '/assets/Varias_monedas2.png', description: 'Incluye 50 monedas de bonificación.', badge: '+10% Bonus', className: 'coin-image' },
        { id: 'coins-1000', name: '1,000 Monedas', price: 8500, image: '/assets/saco_de_monedas.png', description: 'Incluye 150 monedas de bonificación.', badge: '+15% Bonus', className: 'coin-image' },
        { id: 'coins-5000', name: '5,000 Monedas', price: 35000, image: '/assets/cofre_con_monedas.png', description: '¡Incluye 1,250 monedas de bonificación!', badge: '+25% Bonus', premium: true, className: 'coin-image' },
    ],
    accesorios: [
        { id: 'conjunto-mistico', name: 'Conjunto Místico', price: 5000, image: '/assets/conjunto_accesor1.png', description: 'Set completo de accesorios mágicos con efectos especiales.' },
        { id: 'conjunto-legendario', name: 'Conjunto Legendario', price: 4000, image: '/assets/conjunto_accesor2.png', description: 'Accesorios exclusivos con diseños únicos y brillos.' },
        { id: 'conjunto-aventurero', name: 'Conjunto de Aventurero', price: 3500, image: '/assets/conjunto_accesor3.png', description: 'Set completo para exploradores con estilo y funcionalidad.' },
    ]
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function Store() {
    const { currentUser } = useAuth();
    const [activeCategory, setActiveCategory] = useState('rangos');
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handlePurchase = async (product) => {
        if (!currentUser) {
            alert('Debes iniciar sesión para realizar una compra');
            return;
        }

        setSelectedProduct(product);
        setShowCheckoutModal(true);
    };

    const handleConfirmPurchase = async () => {
        if (!selectedProduct) return;

        try {
            // Call backend to create Mercado Pago preference
            const response = await axios.post(`${API_URL}/payments/create-preference`, {
                productId: selectedProduct.id,
                productName: selectedProduct.name,
                price: selectedProduct.price,
                username: currentUser
            });

            if (response.data.init_point) {
                // Redirect to Mercado Pago checkout
                window.location.href = response.data.init_point;
            } else {
                alert('Error al procesar el pago. Por favor intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error creating payment preference:', error);
            alert('Error al conectar con el servidor de pagos. Por favor intenta nuevamente.');
        }
    };

    const currentProducts = products[activeCategory] || [];

    return (
        <>
            <section className="hero" style={{ paddingTop: '12rem', paddingBottom: '3rem' }}>
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title animate-fade-in" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                            <span className="gradient-text">Tienda</span> Crontor
                        </h1>
                        <p className="hero-description animate-fade-in">
                            Mejora tu experiencia con rangos exclusivos, tierras, monedas y accesorios únicos
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="section" style={{ paddingTop: '1rem' }}>
                <div className="container">
                    <div className="category-filter">
                        <button
                            className={`category-btn ${activeCategory === 'rangos' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('rangos')}
                        >
                            Rangos
                        </button>
                        <button
                            className={`category-btn ${activeCategory === 'tierras' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('tierras')}
                        >
                            Tierras
                        </button>
                        <button
                            className={`category-btn ${activeCategory === 'monedas' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('monedas')}
                        >
                            Monedas
                        </button>
                        <button
                            className={`category-btn ${activeCategory === 'accesorios' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('accesorios')}
                        >
                            Accesorios
                        </button>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div className="products-grid">
                        {currentProducts.map(product => (
                            <div key={product.id} className={`product-card glass-card animate-slide-up ${product.premium ? 'premium-card' : ''}`}>
                                {product.badge && (
                                    <div className={`product-badge ${product.premium ? 'premium' : ''}`}>{product.badge}</div>
                                )}
                                <div className={`product-header ${product.className || ''}`}>
                                    <img src={product.image} alt={product.name} className="product-image" />
                                </div>
                                <div className="product-body">
                                    <h3 className="product-title" style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
                                        {product.name}
                                    </h3>
                                    {product.features ? (
                                        <ul className="product-features">
                                            {product.features.map((feature, idx) => (
                                                <li key={idx}>✓ {feature}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="product-description">{product.description}</p>
                                    )}
                                    <div className="product-footer">
                                        <span className={`product-price ${product.premium ? 'premium' : ''}`}>
                                            ${product.price.toLocaleString()}
                                        </span>
                                        <div className="product-actions">
                                            <button
                                                className={`btn ${product.premium ? 'btn-hero' : 'btn-primary'} btn-small`}
                                                onClick={() => handlePurchase(product)}
                                            >
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checkout Modal */}
            {showCheckoutModal && selectedProduct && (
                <div className="modal" style={{ display: 'flex' }}>
                    <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}></div>
                    <div className="modal-content glass-card">
                        <div className="modal-header">
                            <h2 className="modal-title">Confirmar Compra</h2>
                            <button onClick={() => setShowCheckoutModal(false)} className="modal-close">&times;</button>
                        </div>
                        <div className="checkout-info">
                            <div className="checkout-item">
                                <span className="checkout-label">Producto:</span>
                                <span className="checkout-value">{selectedProduct.name}</span>
                            </div>
                            <div className="checkout-item">
                                <span className="checkout-label">Precio:</span>
                                <span className="checkout-value">${selectedProduct.price.toLocaleString()}</span>
                            </div>
                            <div className="checkout-item">
                                <span className="checkout-label">Usuario:</span>
                                <span className="checkout-value">{currentUser}</span>
                            </div>
                        </div>
                        <p className="checkout-note">Serás redirigido a Mercado Pago para completar el pago</p>
                        <button className="btn btn-hero" style={{ width: '100%', justifyContent: 'center' }} onClick={handleConfirmPurchase}>
                            Continuar al Pago
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
