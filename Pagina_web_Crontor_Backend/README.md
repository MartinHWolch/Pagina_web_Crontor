# Crontor Backend - Tebex Integration

Backend API para procesar pagos de la tienda Crontor usando Tebex.

## 🚀 Características

- ✅ Express.js server
- ✅ Integración completa con Tebex Headless API
- ✅ Creación de baskets de pago
- ✅ Manejo de webhooks
- ✅ CORS configurado
- ✅ Variables de entorno seguras

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ con npm
- Cuenta de Tebex (https://www.tebex.io/)
- Credenciales de Tebex (Secret Key y Webstore ID)

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

Edita el archivo `.env` y agrega tus credenciales de Tebex:
```
PORT=3001
TEBEX_SECRET_KEY=tu_secret_key_de_tebex
TEBEX_WEBSTORE_ID=tu_webstore_id
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
BACKEND_URL=http://localhost:3001
```

4. **Iniciar el servidor:**

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 🔑 Obtener Credenciales de Tebex

1. Ve a [Tebex](https://www.tebex.io/) y crea una cuenta
2. Crea un nuevo webstore
3. Ve a "Settings" → "API Keys"
4. Copia tu **Secret Key**
5. Copia tu **Webstore ID**
6. Pégalos en el archivo `.env`

## 🏗️ Estructura del Proyecto

```
├── routes/
│   └── payments.js         # Rutas de pagos con Tebex API
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

### POST /api/payments/create-basket
- Descripción: Crea un basket de pago en Tebex
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
  "basket_id": "abc123def456",
  "checkout_url": "https://checkout.tebex.io/checkout/abc123def456",
  "success": true
}
```

### POST /api/payments/webhook
- Descripción: Recibe notificaciones de Tebex sobre cambios en pagos
- Body: Enviado automáticamente por Tebex
- Respuesta: Status 200

Nota: Configura la URL de webhook en tu panel de Tebex: `https://tu-dominio.com/api/payments/webhook`

### GET /api/payments/status/:basketId
- Descripción: Verifica el estado de un basket/pago
- Parámetros: `basketId` - ID del basket
- Respuesta:
```json
{
  "basket_id": "abc123",
  "status": "completed",
  "data": { ... }
}
```

## 🧪 Probar con Tebex Test Mode

Tebex provee un modo de prueba para testing:

1. Activa el "Test Mode" en tu panel de Tebex
2. Usa tarjetas de prueba de Stripe (Tebex usa Stripe como procesador)
3. Tarjeta de prueba exitosa: `4242 4242 4242 4242`
4. CVV: Cualquier 3 dígitos
5. Fecha: Cualquier fecha futura

[Ver más sobre testing en Tebex](https://docs.tebex.io/developers/testing)

## 🔒 Seguridad

- ⚠️ NUNCA hagas commit del archivo `.env`
- ⚠️ NUNCA compartas tu Secret Key públicamente
- ⚠️ En producción, usa HTTPS
- ⚠️ Valida siempre los webhooks con la firma de Tebex

## 🚀 Despliegue a Producción

1. Cambia `NODE_ENV=production` en `.env`
2. Desactiva el "Test Mode" en tu panel de Tebex
3. Configura la URL de webhook en tu panel de Tebex
4. Asegúrate de usar HTTPS
5. Configura las variables de entorno en tu servidor

## 🐛 Troubleshooting

**Error: "Tebex not configured"**
- Verifica que tu Secret Key sea correcto en `.env`
- Asegúrate de que no sea el valor placeholder

**Error: "CORS"**
- Verifica que `FRONTEND_URL` en `.env` coincida con la URL de tu frontend

**Webhook no recibe notificaciones:**
- Asegúrate de configurar la URL de webhook en el panel de Tebex
- Verifica que tu servidor sea accesible públicamente (usa ngrok para desarrollo local)

## 📚 Recursos

- [Documentación Tebex](https://docs.tebex.io/)
- [Tebex Headless API](https://docs.tebex.io/developers/headless-api)
- [Tebex Webhooks](https://docs.tebex.io/developers/webhooks)
- [Tebex Node.js SDK](https://github.com/tebexio/tebex-sdk-nodejs)

## 🔗 Enlaces Relacionados

- [Frontend README](../Pagina_web_Crontor_React/README.md)
