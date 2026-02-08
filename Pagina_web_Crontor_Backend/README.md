# Crontor Backend - Mercado Pago Integration

Backend API para procesar pagos de la tienda Crontor usando Mercado Pago.

## 🚀 Características

- ✅ Express.js server
- ✅ Integración completa con Mercado Pago SDK
- ✅ Creación de preferencias de pago
- ✅ Manejo de webhooks
- ✅ CORS configurado
- ✅ Variables de entorno seguras

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ con npm
- Cuenta de desarrollador en Mercado Pago Chile
- Credenciales de test de Mercado Pago

### Pasos

1. **Navegar al directorio del backend:**
```bash
cd Pagina_web_Crontor_Backend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Copia el archivo `.env.example` a `.env`:
```bash
copy .env.example .env
```

Edita el archivo `.env` y agrega tus credenciales de Mercado Pago:
```
PORT=3001
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercado_pago
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

4. **Iniciar el servidor:**

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 🔑 Obtener Credenciales de Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.cl/developers)
2. Crea una cuenta de desarrollador
3. Ve a "Tus credenciales"
4. Copia tu **Access Token de prueba** (Test)
5. Pégalo en el archivo `.env` como `MERCADOPAGO_ACCESS_TOKEN`

## 🏗️ Estructura del Proyecto

```
├── config/
│   └── mercadopago.js      # Configuración del SDK
├── routes/
│   └── payments.js         # Rutas de pagos
├── server.js               # Servidor Express principal
├── .env.example            # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🛣️ Endpoints disponibles

### GET /
- Descripción: Health check del API
- Respuesta: `{ "message": "Crontor Backend API - Running" }`

### POST /api/payments/create-preference
- Descripción: Crea una preferencia de pago en Mercado Pago
- Body:
```json
{
  "productId": "caballero",
  "productName": "Caballero",
  "price": 5000,
  "username": "username123"
}
```
- Respuesta:
```json
{
  "id": "123456789",
  "init_point": "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=123456789",
  "sandbox_init_point": "https://sandbox.mercadopago.cl/checkout/v1/redirect?pref_id=123456789"
}
```

### POST /api/payments/webhook
- Descripción: Recibe notificaciones de Mercado Pago sobre cambios en pagos
- Body: Enviado automáticamente por Mercado Pago
- Respuesta: Status 200

Nota: Para que los webhooks funcionen en desarrollo local, necesitas usar ngrok o similar para exponer tu servidor local

### GET /api/payments/status/:id
- Descripción: Verifica el estado de un pago
- Parámetros: `id` - ID del pago
- Respuesta:
```json
{
  "id": "payment_id",
  "status": "approved",
  "message": "Payment status"
}
```

## 🧪 Probar con Mercado Pago Sandbox

Mercado Pago provee tarjetas de prueba para el ambiente de sandbox (Chile):

**Tarjeta de Crédito - Aprobada:**
- Número: `5031 7557 3453 0604`
- CVV: 123
- Fecha: Cualquier fecha futura

**Tarjeta de Débito - Aprobada:**
- Número: `4168 8188 4288 1319`
- CVV: 123
- Fecha: Cualquier fecha futura

**Tarjeta Rechazada:**
- Número: `5031 4332 1540 6351`
- CVV: 123
- Fecha: Cualquier fecha futura

[Ver más tarjetas de prueba](https://www.mercadopago.cl/developers/es/docs/checkout-api/testing)

## 🔒 Seguridad

- ⚠️ NUNCA hagas commit del archivo `.env`
- ⚠️ NUNCA compartas tu Access Token público
- ⚠️ En producción, usa HTTPS
- ⚠️ Valida siempre los webhooks con la firma de Mercado Pago

## 🚀 Despliegue a Producción

1. Cambia `NODE_ENV=production` en `.env`
2. Usa el Access Token de producción (no el de test)
3. Configura la URL de webhook en tu panel de Mercado Pago
4. Asegúrate de usar HTTPS
5. Configura las variables de entorno en tu servidor

## 🐛 Troubleshooting

**Error: "Invalid credentials"**
- Verifica que tu Access Token sea correcto
- Asegúrate de usar el Access Token de Chile

**Error: "CORS"**
- Verifica que `FRONTEND_URL` en `.env` coincida con la URL de tu frontend

**Webhook no recibe notificaciones:**
- En desarrollo local, usa ngrok para exponer tu servidor
- Asegúrate de configurar la URL de webhook en Mercado Pago

## 📚 Recursos

- [Documentación Mercado Pago](https://www.mercadopago.cl/developers/es/docs)
- [SDK de Mercado Pago para Node.js](https://github.com/mercadopago/sdk-nodejs)
- [Guía de integración Checkout Pro](https://www.mercadopago.cl/developers/es/docs/checkout-pro/landing)

## 🔗 Enlaces Relacionados

- [Frontend README](../Pagina_web_Crontor_React/README.md)
