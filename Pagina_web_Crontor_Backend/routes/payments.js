import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const router = express.Router();

const TEBEX_CHECKOUT_API = 'https://checkout.tebex.io';
const TEBEX_SECRET_KEY = process.env.TEBEX_SECRET_KEY;
const TEBEX_WEBSTORE_ID = process.env.TEBEX_WEBSTORE_ID;
const TEBEX_WEBHOOK_SECRET = process.env.TEBEX_WEBHOOK_SECRET;

// Product Catalog for server-side validation
const PRODUCT_CATALOG = {
    'rank-caballero': { name: 'Rango Caballero', price: 5000, category: 'rangos' },
    'rank-conde': { name: 'Rango Conde', price: 10000, category: 'rangos' },
    'rank-duque': { name: 'Rango Duque', price: 20000, category: 'rangos' },
    'rank-soberano': { name: 'Rango Soberano', price: 35000, category: 'rangos' },
    'tierras-6x6': { name: 'Terreno 6x6', price: 2000, category: 'tierras' },
    'tierras-20x20': { name: 'Terreno 20x20', price: 5000, category: 'tierras' },
    'tierras-40x40': { name: 'Terreno 40x40', price: 12000, category: 'tierras' },
    'tierras-60x60': { name: 'Terreno 60x60', price: 25000, category: 'tierras' },
    'monedas-100': { name: '100 Monedas', price: 1000, category: 'monedas' },
    'monedas-500': { name: '500 Monedas', price: 4500, category: 'monedas' },
    'monedas-1000': { name: '1000 Monedas', price: 8500, category: 'monedas' },
    'monedas-5000': { name: '5000 Monedas', price: 35000, category: 'monedas' },
    'acc-mistico': { name: 'Conjunto Místico', price: 5000, category: 'accesorios' },
    'acc-legendario': { name: 'Conjunto Legendario', price: 4000, category: 'accesorios' },
    'acc-aventurero': { name: 'Conjunto de Aventurero', price: 3500, category: 'accesorios' }
};

// Middleware to check if Tebex credentials are configured
const checkTebexConfig = (req, res, next) => {
    if (!TEBEX_SECRET_KEY || TEBEX_SECRET_KEY === 'your_tebex_secret_key_here') {
        return res.status(500).json({
            error: 'Tebex not configured',
            message: 'Please configure TEBEX_SECRET_KEY in your .env file'
        });
    }
    next();
};

// Create Tebex basket with dynamic products (Checkout API)
router.post('/create-basket', checkTebexConfig, async (req, res) => {
    try {
        const { username, items, productId, productName, price } = req.body;

        // Validate username
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        let packages = [];
        let customData = {
            username: username,
            timestamp: Date.now()
        };

        // Support both cart (multiple items) and single product purchase
        if (items && Array.isArray(items) && items.length > 0) {
            // Shopping cart with multiple items
            for (const item of items) {
                // Validate item against catalog for security
                const productFromCatalog = PRODUCT_CATALOG[item.productId];
                if (!productFromCatalog) {
                    console.warn(`Product ID not found: ${item.productId}`);
                    return res.status(400).json({ error: `Product not found: ${item.productId}` });
                }

                // Use price from catalog
                const priceInUSD = (productFromCatalog.price / 900).toFixed(2);

                packages.push({
                    name: productFromCatalog.name,
                    price: parseFloat(priceInUSD),
                    qty: item.quantity,
                    type: 'single',
                    description: `${productFromCatalog.name} para ${username}`,
                    custom: {
                        product_id: item.productId,
                        username: username,
                        category: productFromCatalog.category
                    }
                });
            }

            // Store cart items in custom data for webhook processing
            customData.items = items;
            customData.total_items = items.reduce((sum, item) => sum + item.quantity, 0);

        } else if (productId && productName) {
            // Single product purchase (backward compatibility)
            const productFromCatalog = PRODUCT_CATALOG[productId];
            const finalPrice = productFromCatalog ? productFromCatalog.price : 0;

            if (!productFromCatalog) {
                return res.status(400).json({ error: `Product not found: ${productId}` });
            }

            const priceInUSD = (finalPrice / 900).toFixed(2);

            packages.push({
                name: productName,
                price: parseFloat(priceInUSD),
                qty: 1,
                type: 'single',
                description: `Compra de ${productName} para ${username}`,
                custom: {
                    product_id: productId,
                    username: username
                }
            });
            customData.product_id = productId;

        } else {
            return res.status(400).json({
                error: 'Either items array or single product (productId, productName) is required'
            });
        }

        console.log(`Creating basket for ${username} with ${packages.length} package(s)`);

        // Create basket with Checkout API
        const basketResponse = await axios.post(
            `${TEBEX_CHECKOUT_API}/baskets`,
            {
                return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
                cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/failure`,
                complete_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
                complete_auto_redirect: true,
                custom: customData,
                packages: packages
            },
            {
                headers: {
                    'Authorization': `Bearer ${TEBEX_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
                auth: {
                    username: TEBEX_WEBSTORE_ID,
                    password: TEBEX_SECRET_KEY
                }
            }
        );

        const basketIdent = basketResponse.data.ident;
        const checkoutUrl = basketResponse.data.links.checkout;

        console.log(`Basket created successfully: ${basketIdent}`);

        res.json({
            basket_id: basketIdent,
            checkout_url: checkoutUrl,
            success: true,
            items_count: packages.length
        });

    } catch (error) {
        console.error('Error creating Tebex basket:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Error creating payment basket',
            details: error.response?.data || error.message,
            message: 'Si ves un error de autorización, puede que necesites contactar a Tebex para activar el Checkout API'
        });
    }
});

// Webhook to receive payment notifications from Tebex
router.post('/webhook', async (req, res) => {
    try {
        const payload = req.body;
        const signature = req.headers['x-signature'];

        console.log('Tebex webhook received');

        // Verify webhook signature
        if (TEBEX_WEBHOOK_SECRET && signature) {
            const hmac = crypto.createHmac('sha256', TEBEX_WEBHOOK_SECRET);
            const bodyString = JSON.stringify(payload);
            const hash = hmac.update(bodyString).digest('hex');

            // Note: Tebex might send signature in a different format, 
            // adjust if necessary based on Tebex documentation
            if (hash !== signature) {
                console.warn('Webhook signature mismatch!');
                // For development, we might not want to reject yet if secret isn't configured
                if (process.env.NODE_ENV === 'production') {
                    return res.status(401).json({ error: 'Invalid signature' });
                }
            }
        }

        // Process different webhook types
        const { type, subject } = payload;

        switch (type) {
            case 'payment.completed':
                const paymentData = subject;
                const basket = paymentData.basket || {};
                const custom = basket.custom || {};
                const username = custom.username;
                const items = custom.items || [];

                console.log(`💰 Payment completed for user: ${username}`);
                console.log(`Items purchased: ${items.length}`);

                items.forEach(item => {
                    console.log(` - ${item.quantity}x ${item.productName} (${item.productId})`);
                    // TO DO: Implement actual delivery logic here
                    // e.g., db.saveOrder({ username, productId: item.productId, ... })
                });

                // Audit log
                console.log('Transaction details:', {
                    transaction_id: paymentData.transaction_id,
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    username: username
                });
                break;

            case 'payment.declined':
                console.log('❌ Payment declined:', subject.transaction_id);
                break;

            case 'payment.refunded':
                console.log('↩️ Payment refunded:', subject.transaction_id);
                break;

            case 'validation.webhook':
                console.log('✅ Webhook validation received from Tebex');
                break;

            default:
                console.log('❓ Unknown webhook type:', type);
        }

        // Always return 200 to acknowledge receipt
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

// Get payment/basket status
router.get('/status/:basketId', checkTebexConfig, async (req, res) => {
    try {
        const { basketId } = req.params;

        const response = await axios.get(
            `${TEBEX_CHECKOUT_API}/baskets/${basketId}`,
            {
                headers: {
                    'Authorization': `Bearer ${TEBEX_SECRET_KEY}`
                },
                auth: {
                    username: TEBEX_WEBSTORE_ID,
                    password: TEBEX_SECRET_KEY
                }
            }
        );

        res.json({
            basket_id: basketId,
            status: response.data.complete ? 'completed' : 'pending',
            data: response.data
        });
    } catch (error) {
        console.error('Error checking basket status:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Error checking payment status',
            details: error.response?.data || error.message
        });
    }
});

export default router;
