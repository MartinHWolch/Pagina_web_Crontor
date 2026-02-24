import { useState } from 'react';

export default function Home() {
    const [copyFeedback, setCopyFeedback] = useState(false);

    const copyServerAddress = () => {
        const serverAddress = 'play.crontor.com:6906';
        navigator.clipboard.writeText(serverAddress).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        }).catch(() => {
            alert('Dirección copiada: ' + serverAddress);
        });
    };

    const copyServerAddressIP = () => {
        const serverAddressIP = '147.185.221.25:6906';
        navigator.clipboard.writeText(serverAddressIP).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        }).catch(() => {
            alert('Dirección IP copiada: ' + serverAddressIP);
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        {/* Large Logo */}
                        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xs)' }}>
                            <img src="/assets/Logo.png" alt="Crontor" style={{ maxWidth: '600px', width: '100%', height: 'auto' }} />
                        </div>

                        <h1 className="hero-title animate-fade-in">
                            Servidor <span className="gradient-text">Hytale</span> LATAM
                        </h1>
                        <p className="hero-description animate-fade-in">
                            Servidor comunitario para LATAM con contenido único y progresión equilibrada. Una experiencia
                            diseñada desde cero para aventureros latinoamericanos.
                        </p>

                        {/* Server Address */}
                        <div className="server-address-container" style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
                            <p style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem', marginBottom: 'var(--spacing-md)', fontWeight: 600 }}>
                                Dirección del Servidor
                            </p>
                            <div
                                className="server-address-box"
                                onClick={copyServerAddress}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)',
                                    background: 'rgba(26, 26, 36, 0.8)',
                                    border: '2px solid rgba(212, 165, 116, 0.5)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--spacing-lg) var(--spacing-xl)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)',
                                    marginBottom: 'var(--spacing-sm)'
                                }}
                            >
                                <span className="server-address" style={{ fontFamily: "'Courier New', monospace", fontSize: '1.75rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                                    play.crontor.com:6906
                                </span>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </div>
                            <div
                                className="server-address-box"
                                onClick={copyServerAddressIP}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)',
                                    background: 'rgba(26, 26, 36, 0.8)',
                                    border: '2px solid rgba(212, 165, 116, 0.5)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--spacing-lg) var(--spacing-xl)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                }}
                            >
                                <span className="server-address-ip" style={{ fontFamily: "'Courier New', monospace", fontSize: '1.75rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                                    147.185.221.25:6906
                                </span>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </div>
                            <p
                                style={{
                                    color: 'var(--color-accent)',
                                    fontSize: '1rem',
                                    marginTop: 'var(--spacing-md)',
                                    opacity: copyFeedback ? 1 : 0,
                                    transition: 'opacity 0.3s',
                                    fontWeight: 600
                                }}
                            >
                                ✓ ¡Dirección copiada!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Discord Community CTA */}
            <section className="footer-cta">
                <div className="container">
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <div className="cta-content">
                            <h2 className="cta-title">¡Únete a Nuestra Comunidad de Discord!</h2>
                            <p className="cta-description">
                                Forma parte del centro de la comunidad. Conecta con otros jugadores, entérate de novedades,
                                participa en eventos y ayuda a construir el futuro del reino junto al equipo y la comunidad.
                            </p>
                            <a href="https://discord.gg/6cc8HaNAQk" className="btn btn-hero" target="_blank" rel="noopener noreferrer">
                                Únete a Discord
                                <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detalles Section */}
            <section className="section" id="detalles">
                <div className="container">
                    <h2 className="section-title">Detalles</h2>
                    <div className="cards-grid">
                        <div className="card glass-card">
                            <div className="card-icon">
                                <img src="/assets/Survival.png" alt="Survival" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="card-title">Aventura y Supervivencia</h3>
                            <p className="card-description">
                                Un mundo persistente donde explorar, construir y progresar junto a otros aventureros. Sistemas
                                mejorados, eventos dinámicos y una experiencia pensada para jugar en comunidad.
                            </p>
                        </div>
                        <div className="card glass-card">
                            <div className="card-icon">
                                <img src="/assets/Minijuegos.png" alt="Minijuegos" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="card-title">Actividades y Desafíos</h3>
                            <p className="card-description">
                                Desafíos cooperativos, eventos especiales y actividades diseñadas para poner a prueba tus
                                habilidades y fomentar el trabajo en equipo.
                            </p>
                        </div>
                        <div className="card glass-card">
                            <div className="card-icon">
                                <img src="/assets/Comunidad.png" alt="Comunidad" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <h3 className="card-title">Comunidad LATAM</h3>
                            <p className="card-description">
                                Una comunidad latinoamericana activa, cercana y en crecimiento, donde el respeto, la
                                colaboración y la diversión son parte del reino.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Características Section */}
            <section className="section section-dark" id="caracteristicas">
                <div className="container">
                    <h2 className="section-title">Características</h2>
                    <div className="features-list">
                        <div className="glass-card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)' }}>
                            <div className="feature-item animate-slide-up">
                                <div className="feature-content">
                                    <div className="feature-icon-large">
                                        <img src="/assets/Mascotas_Monturas.png" alt="Mascotas y Monturas" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <h3 className="feature-title">Mascotas y monturas</h3>
                                    <p className="feature-description">
                                        Haz que tu aventura se sienta única con mascotas y monturas especiales que te acompañan
                                        en cada camino. Desde compañeros adorables hasta criaturas imponentes, podrás
                                        desbloquear y coleccionar distintas opciones a medida que progresas en el reino.
                                        <br /><br />
                                        Explora, participa en actividades del servidor y consigue personalizaciones que reflejen
                                        tu estilo. En Crontor, cada aventurero puede tener una presencia propia.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: 'var(--spacing-xl)' }}>
                            <div className="feature-item animate-slide-up">
                                <div className="feature-content">
                                    <div className="feature-icon-large">
                                        <img src="/assets/accesorios.png" alt="Skins Personalizadas" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <h3 className="feature-title">Accesorios y Objetos Cosméticos</h3>
                                    <p className="feature-description">
                                        Personaliza tu personaje con una amplia variedad de accesorios cosméticos: capas,
                                        adornos, peluches, objetos decorativos y elementos visuales que no afectan la
                                        jugabilidad.
                                        <br /><br />
                                        Cada accesorio está diseñado para expresar tu identidad dentro del reino y hacer que tu
                                        aventurero sea verdaderamente único.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
