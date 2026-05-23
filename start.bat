@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%

REM Ensure required runtime directories exist
if not exist "cookies" mkdir cookies
if not exist "temp\downloads" mkdir temp\downloads
if not exist "logs" mkdir logs

REM Clear Nuxt/Vite cache to avoid stale import errors
if exist ".nuxt" rmdir /s /q ".nuxt"

echo Starting xiaoyuevideo dev server...
echo.
npx nuxi dev
pause
