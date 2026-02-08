import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentPending() {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id');

    return (
        <section className="hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>⏳</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>
                        Pago Pendiente
                    </h1>
                    <p style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-secondary)' }}>
                        Tu pago está siendo procesado. Recibirás una confirmación cuando se complete.
                    </p>
                    {paymentId && (
                        <p style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-muted)' }}>
                            ID de pago: {paymentId}
                        </p>
                    )}
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/" className="btn btn-primary">
                            Volver al Inicio
                        </Link>
                        <Link to="/store" className="btn btn-secondary">
                            Ir a la Tienda
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
