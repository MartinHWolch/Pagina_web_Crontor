import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import CartModal from './modals/CartModal';

export default function Header() {
    const { currentUser, userRank, logout } = useAuth();
    const { setIsCartOpen, getCartItemCount } = useCart();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
            logout();
            alert('Sesión cerrada exitosamente');
        }
    };

    const switchToRegister = () => {
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    const switchToLogin = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    return (
        <>
            <header className="header">
                <nav className="nav-container">
                    <div className="logo">
                        <Link to="/">
                            <img src="/assets/logo_pequeño.png" alt="Crontor" style={{ height: '140px' }} />
                        </Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Inicio</Link>
                        <Link to="/store" className="nav-link">Tienda</Link>
                        <Link to="/about" className="nav-link">Sobre Nosotros</Link>

                        <div className="nav-actions">
                            <button className="cart-btn" onClick={() => setIsCartOpen(true)} title="Ver carrito">
                                <i className="fas fa-shopping-basket"></i>
                                {getCartItemCount() > 0 && (
                                    <span className="cart-badge badge-animate">{getCartItemCount()}</span>
                                )}
                            </button>

                            {currentUser ? (
                                <div className="user-profile">
                                    <div className="user-info">
                                        <span className="user-rank">{userRank}</span>
                                        <span className="user-name">{currentUser}</span>
                                    </div>
                                    <button onClick={handleLogout} className="btn-logout" title="Cerrar sesión">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="btn btn-primary"
                                >
                                    Iniciar Sesión
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <LoginModal
                show={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToRegister={switchToRegister}
            />

            <RegisterModal
                show={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSwitchToLogin={switchToLogin}
            />

            <CartModal />
        </>
    );
}
