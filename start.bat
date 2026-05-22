@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%
echo Starting XiaoYueVideo dev server...
echo.
npx nuxi dev
pause
