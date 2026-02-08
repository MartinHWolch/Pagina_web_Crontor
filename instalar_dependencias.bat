@echo off
echo ================================================
echo   CRONTOR - Instalacion de Dependencias
echo ================================================
echo.

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo.
    echo Por favor:
    echo 1. Cierra esta terminal
    echo 2. Abre una NUEVA terminal PowerShell
    echo 3. Ejecuta este script nuevamente
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado:
node --version
npm --version
echo.

echo [2/4] Instalando dependencias del Backend...
cd Pagina_web_Crontor_Backend
call npm install
if errorlevel 1 (
    echo ERROR en instalacion del backend
    pause
    exit /b 1
)
echo Backend: Dependencias instaladas
echo.

echo [3/4] Instalando dependencias del Frontend...
cd ..\Pagina_web_Crontor_React
call npm install
if errorlevel 1 (
    echo ERROR en instalacion del frontend
    pause
    exit /b 1
)
echo Frontend: Dependencias instaladas
echo.

echo [4/4] Configurando variables de entorno...
cd ..\Pagina_web_Crontor_Backend
if not exist .env (
    copy .env.example .env
    echo Archivo .env creado. IMPORTANTE: Edita el archivo .env y agrega tu Access Token de Mercado Pago
) else (
    echo Archivo .env ya existe
)
echo.

echo ================================================
echo   INSTALACION COMPLETADA
echo ================================================
echo.
echo Proximos pasos:
echo.
echo 1. Edita el archivo .env en Pagina_web_Crontor_Backend
echo    y agrega tu Access Token de Mercado Pago
echo.
echo 2. Para ejecutar el proyecto, usa:
echo    - iniciar_proyecto.bat
echo.
pause
