import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Crontor</h3>
                    <p style={{ marginBottom: 'var(--spacing-md)' }}>Servidor Hytale LATAM</p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Inicio</Link>
                        <Link to="/store" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Tienda</Link>
                        <Link to="/about" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Sobre Nosotros</Link>
                        <Link to="/terms" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Términos y Condiciones</Link>
                        <a href="https://discord.gg/6cc8HaNAQk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
                            Discord (Contacto Oficial)
                        </a>
                    </div>
                </div>
                <p className="footer-text" style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    © 2026 Crontor. Proyecto comunitario no afiliado con Hypixel Studios.<br />
                    Hytale y todos los assets relacionados son propiedad de Hypixel Studios.
                </p>
            </div>
        </footer>
    );
}
