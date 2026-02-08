import express from 'express';
import { Preference } from 'mercadopago';
import client from '../config/mercadopago.js';

const router = express.Router();

// Create payment preference
router.post('/create-preference', async (req, res) => {
    try {
        const { productId, productName, price, username } = req.body;

        if (!productId || !productName || !price || !username) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const preference = new Preference(client);

        // Create preference body
        const body = {
            items: [
                {
                    id: productId,
                    title: productName,
                    quantity: 1,
                    unit_price: price,
                    currency_id: 'CLP' // Chilean Pesos
                }
            ],
            payer: {
                name: username,
                email: 'test@test.com' // In production, use real email
            },
            back_urls: {
                success: `${process.env.FRONTEND_URL}/payment/success`,
                failure: `${process.env.FRONTEND_URL}/payment/failure`,
                pending: `${process.env.FRONTEND_URL}/payment/pending`
            },
            auto_return: 'approved',
            external_reference: `${username}-${productId}-${Date.now()}`,
            statement_descriptor: 'CRONTOR',
            notification_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/payments/webhook`
        };

        const result = await preference.create({ body });

        res.json({
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point
        });

    } catch (error) {
        console.error('Error creating preference:', error);
        res.status(500).json({
            error: 'Error creating payment preference',
            details: error.message
        });
    }
});

// Webhook to receive payment notifications
router.post('/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;

        console.log('Webhook received:', { type, data });

        // Process notification based on type
        if (type === 'payment') {
            const paymentId = data.id;
            console.log('Payment notification received:', paymentId);

            // Here you would:
            // 1. Verify the payment with Mercado Pago API
            // 2. Update your database with payment status
            // 3. Grant the user their purchased items
            // For now, we just log it
        }

        // Always return 200 to acknowledge receipt
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Error');
    }
});

// Get payment status
router.get('/status/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Here you would check payment status with Mercado Pago API
        // For now, return a placeholder
        res.json({
            id,
            status: 'pending',
            message: 'Payment status check endpoint'
        });
    } catch (error) {
        console.error('Error checking payment status:', error);
        res.status(500).json({ error: 'Error checking payment status' });
    }
});

export default router;
