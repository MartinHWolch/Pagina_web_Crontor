# Guía de Instalación - Node.js y npm

## ❗ Importante

Para ejecutar este proyecto, necesitas tener **Node.js** y **npm** instalados en tu sistema. Actualmente no están instalados.

## 📥 Instalar Node.js y npm

### Opción 1: Instalador Oficial (Recomendado)

1. **Descarga Node.js:**
   - Ve a [https://nodejs.org/](https://nodejs.org/)
   - Descarga la versión **LTS** (Long Term Support) - Recomendada
   - Versión actual recomendada: **v20.x.x** o superior

2. **Ejecuta el instalador:**
   - Abre el archivo `.msi` descargado
   - Sigue el asistente de instalación
   - **Importante:** Marca la opción "Automatically install necessary tools"
   - Click "Next" hasta completar la instalación

3. **Verifica la instalación:**
   - Abre una **nueva** terminal PowerShell
   - Ejecuta: `node --version`
   - Ejecuta: `npm --version`
   - Deberías ver los números de versión

### Opción 2: Usando Winget (Windows Package Manager)

Si tienes Windows 11 o Windows 10 actualizado:

```powershell
winget install OpenJS.NodeJS.LTS
```

Luego reinicia tu terminal.

---

## 🚀 Después de Instalar Node.js

Una vez que tengas Node.js y npm instalados, sigue estos pasos:

### 1️⃣ Instalar Dependencias del Backend

```powershell
cd c:\Users\ferna\OneDrive\Documentos\Crontor_web\Pagina_web_Crontor_Backend
npm install
```

### 2️⃣ Configurar Tebex

Crea el archivo `.env` en el backend:

```powershell
copy .env.example .env
```

Luego edita el archivo `.env` con tus credenciales de Tebex (Secret Key y Webstore ID).

### 3️⃣ Instalar Dependencias del Frontend

```powershell
cd c:\Users\ferna\OneDrive\Documentos\Crontor_web\Pagina_web_Crontor_React
npm install
```

### 4️⃣ Ejecutar el Backend (Terminal 1)

```powershell
cd c:\Users\ferna\OneDrive\Documentos\Crontor_web\Pagina_web_Crontor_Backend
npm run dev
```

Deberías ver:
```
Server running on port 3001
```

### 5️⃣ Ejecutar el Frontend (Terminal 2 - Nueva)

Abre una **NUEVA** terminal y ejecuta:

```powershell
cd c:\Users\ferna\OneDrive\Documentos\Crontor_web\Pagina_web_Crontor_React
npm run dev
```

Deberías ver:
```
VITE v5.1.0  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 6️⃣ Abrir en el Navegador

Abre tu navegador en: **http://localhost:5173**

---

## 🎯 Resumen Rápido

```powershell
# 1. Instalar Node.js desde https://nodejs.org/

# 2. Instalar dependencias del backend
cd Pagina_web_Crontor_Backend
npm install

# 3. Configurar .env del backend
copy .env.example .env
# (Editar .env con tu Access Token)

# 4. Instalar dependencias del frontend
cd ..\Pagina_web_Crontor_React
npm install

# 5. Ejecutar backend (Terminal 1)
cd ..\Pagina_web_Crontor_Backend
npm run dev

# 6. Ejecutar frontend (Terminal 2)
cd ..\Pagina_web_Crontor_React
npm run dev

# 7. Abrir http://localhost:5173 en el navegador
```

---

## ❓ Resolución de Problemas

### "npm no se reconoce..."
- Reinicia tu terminal después de instalar Node.js
- Si persiste, reinicia tu computadora

### "Cannot find module..."
- Asegúrate de haber ejecutado `npm install` en ambas carpetas

### El frontend no se conecta al backend
- Verifica que ambos servidores estén corriendo
- Verifica que el backend esté en el puerto 3001
- Verifica que el frontend esté en el puerto 5173

---

## 📚 Documentación Completa

Para más detalles, revisa:
- `Pagina_web_Crontor_React/README.md` - Documentación del frontend
- `Pagina_web_Crontor_Backend/README.md` - Documentación del backend
- `walkthrough.md` - Guía completa paso a paso
