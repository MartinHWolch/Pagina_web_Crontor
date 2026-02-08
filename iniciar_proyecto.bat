@echo off
echo ================================================
echo   CRONTOR - Iniciar Proyecto
echo ================================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo Por favor ejecuta primero: instalar_dependencias.bat
    pause
    exit /b 1
)

echo Iniciando Backend en una nueva ventana...
start "CRONTOR BACKEND" cmd /k "cd /d %~dp0Pagina_web_Crontor_Backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Iniciando Frontend en una nueva ventana...
start "CRONTOR FRONTEND" cmd /k "cd /d %~dp0Pagina_web_Crontor_React && npm run dev"

echo.
echo ================================================
echo   SERVIDORES INICIADOS
echo ================================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Se han abierto dos ventanas nuevas:
echo - CRONTOR BACKEND (puerto 3001)
echo - CRONTOR FRONTEND (puerto 5173)
echo.
echo Abre tu navegador en: http://localhost:5173
echo.
echo Para detener los servidores, cierra las ventanas
echo o presiona Ctrl+C en cada una.
echo.
pause
