export default function About() {
    return (
        <>
            <section className="hero" style={{ paddingTop: '12rem', paddingBottom: '3rem' }}>
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Sobre <span className="gradient-text">Nosotros</span>
                        </h1>
                        <p className="hero-description" style={{ textAlign: 'center' }}>
                            Conoce más sobre el equipo detrás de Crontor
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--spacing-lg)' }}>¿Quiénes Somos?</h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                            Crontor es un proyecto comunitario creado por jugadores de Hytale en Latinoamérica. Buscamos
                            construir un reino estable, justo y en constante evolución, pensado para que la comunidad LATAM
                            disfrute una experiencia cuidada desde el primer día.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--spacing-lg)' }}>Principios del Servidor</h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                            Las contribuciones son opcionales y no entregan ventajas competitivas. Priorizamos el juego justo,
                            el respeto y una experiencia equilibrada para todos.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--spacing-lg)' }}>Estado del Proyecto</h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                            El servidor está en desarrollo activo: algunas funciones pueden ajustarse para mejorar la
                            experiencia general. Para soporte y anuncios oficiales, nuestro canal principal es Discord.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <h2 className="section-title" style={{ marginBottom: 'var(--spacing-lg)' }}>Únete a la Comunidad</h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: 'var(--spacing-lg)' }}>
                            Forma parte de nuestra comunidad en Discord
                        </p>
                        <a href="https://discord.gg/6cc8HaNAQk" className="btn btn-hero" target="_blank" rel="noopener noreferrer">
                            Únete a Discord
                            <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
