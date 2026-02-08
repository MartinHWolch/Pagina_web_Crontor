import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginModal({ show, onClose, onSwitchToRegister }) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(username, password);

        if (result.success) {
            alert(result.message);
            onClose();
            window.location.reload();
        } else {
            alert(result.message);
        }
    };

    if (!show) return null;

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content glass-card">
                <div className="modal-header">
                    <h2 className="modal-title">Iniciar Sesión</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-username">Usuario de Hytale</label>
                        <input
                            type="text"
                            id="login-username"
                            placeholder="Tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Contraseña</label>
                        <input
                            type="password"
                            id="login-password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Entrar
                    </button>
                </form>
                <div className="auth-divider">
                    <span>o</span>
                </div>
                <button onClick={onSwitchToRegister} className="btn-text">
                    ¿No tienes cuenta? Regístrate
                </button>
            </div>
        </div>
    );
}
