import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentFailure() {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id');

    return (
        <section className="hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>❌</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Pago Rechazado
                    </h1>
                    <p style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-secondary)' }}>
                        Hubo un problema al procesar tu pago. Por favor, intenta nuevamente o contacta a soporte.
                    </p>
                    {paymentId && (
                        <p style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                            ID de referencia: {paymentId}
                        </p>
                    )}
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/store" className="btn btn-primary">
                            Intentar de Nuevo
                        </Link>
                        <Link to="/" className="btn btn-secondary">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
