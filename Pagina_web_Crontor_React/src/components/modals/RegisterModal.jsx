import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterModal({ show, onClose, onSwitchToLogin }) {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = register(username, password, confirmPassword);

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
                    <h2 className="modal-title">Crear Cuenta</h2>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="register-username">Usuario de Hytale</label>
                        <input
                            type="text"
                            id="register-username"
                            placeholder="Elige tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Contraseña</label>
                        <input
                            type="password"
                            id="register-password"
                            placeholder="Crea una contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-confirm">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="register-confirm"
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Registrarse
                    </button>
                </form>
                <div className="auth-divider">
                    <span>o</span>
                </div>
                <button onClick={onSwitchToLogin} className="btn-text">
                    ¿Ya tienes cuenta? Inicia sesión
                </button>
            </div>
        </div>
    );
}
