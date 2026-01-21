@echo off
echo ====================================
echo WhatsApp Bot - Dependency Installer
echo ====================================
echo.

cd apps\web

echo Installing dependencies...
call npm install @whiskeysockets/baileys@latest qrcode-terminal pino @hapi/boom

echo.
echo ====================================
echo Installation Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. In another terminal, run: npx tsx scripts/start-whatsapp.ts
echo 3. Scan QR code with your WhatsApp
echo.
pause
