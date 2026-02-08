import { Link } from 'react-router-dom';

export default function Terms() {
    return (
        <>
            <section className="hero" style={{ paddingTop: '12rem', paddingBottom: '3rem' }}>
                <div className="container">
                    <h1 className="hero-title">
                        <span className="gradient-text">Términos</span> y Condiciones
                    </h1>
                    <p className="hero-description">
                        Lee nuestros términos y condiciones de servicio
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)' }}>
                        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Términos y Condiciones de Servicio</h2>

                        <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                            <h3 style={{ marginTop: 'var(--spacing-lg', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>1. Aceptación de Términos</h3>
                            <p>Al acceder y utilizar los servicios de Crontor, aceptas estar sujeto a estos Términos y Condiciones.</p>

                            <h3 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>2. Naturaleza del Servicio</h3>
                            <p>Crontor es un servidor comunitario de Hytale. No estamos afiliados con Hypixel Studios y operamos de manera independiente.</p>

                            <h3 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>3. Contribuciones</h3>
                            <p>Las contribuciones financieras son voluntarias y apoyan los costos operativos del servidor. No garantizan reembolso y son definitivas una vez procesadas.</p>

                            <h3 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>4. Juego Justo</h3>
                            <p>Los beneficios otorgados por contribuciones son estrictamente cosméticos o de conveniencia. No ofrecemos ventajas competitivas (pay-to-win).</p>

                            <h3 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>5. Reglas del Servidor</h3>
                            <p>Los jugadores deben respetar las reglas del servidor disponibles en nuestro Discord. El incumplimiento puede resultar en sanciones.</p>

                            <h3 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>6. Modificaciones</h3>
                            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados a través de nuestros canales oficiales.</p>

                            <h3 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>7. Contacto</h3>
                            <p>Para consultas o soporte, utiliza nuestro servidor de Discord oficial.</p>

                            <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
                                <Link to="/store" className="btn btn-primary">
                                    Volver a la Tienda
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
