# Crontor React Frontend

Sitio web de Crontor migrado a React con integración de Tebex.

## 🚀 Características

- ✅ React 18 con Vite
- ✅ React Router para navegación
- ✅ Context API para gestión de estado
- ✅ Autenticación con localStorage
- ✅ Integración con Tebex
- ✅ Diseño responsive
- ✅ Animaciones suaves

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ con npm

### Pasos

1. **Navegar al directorio del proyecto:**
```bash
cd Pagina_web_Crontor_React
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Asegúrate de que el archivo `.env` existe con:
```
VITE_API_URL=http://localhost:3001/api
```

4. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Header.jsx     # Navegación y perfil de usuario
│   ├── Footer.jsx     # Pie de página
│   ├── AnimatedBackground.jsx
│   └── modals/        # Modales
│       ├── LoginModal.jsx
│       └── RegisterModal.jsx
├── pages/             # Páginas de la aplicación
│   ├── Home.jsx       # Página principal
│   ├── Store.jsx      # Tienda con productos
│   ├── About.jsx      # Sobre nosotros
│   ├── Terms.jsx      # Términos y condiciones
│   ├── PaymentSuccess.jsx
│   ├── PaymentFailure.jsx
│   └── PaymentPending.jsx
├── context/           # Contextos de React
│   └── AuthContext.jsx # Autenticación
├── App.jsx            # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🛒 Flujo de Compra

1. Usuario inicia sesión
2. Navega a la tienda
3. Selecciona un producto
4. Click en "Comprar"
5. Confirma la compra
6. Es redirigido a Tebex checkout
7. Completa el pago de forma segura
8. Es redirigido de vuelta con el resultado

## 🔨 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción

## 🌐 Navegación

- `/` - Página principal
- `/store` - Tienda
- `/about` - Sobre nosotros
- `/terms` - Términos y condiciones
- `/payment/success` - Pago exitoso
- `/payment/failure` - Pago fallido
- `/payment/pending` - Pago pendiente

## 📝 Notas

- El sistema de autenticación usa localStorage (solo para demostración)
- Los assets están en `/public/assets/`
- La aplicación se conecta al backend en `http://localhost:3001/api`

## 🔗 Enlaces Relacionados

- [Backend README](../Pagina_web_Crontor_Backend/README.md)
- [Documentación de Tebex](https://docs.tebex.io/)
