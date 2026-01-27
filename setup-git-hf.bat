@echo off
echo ====================================
echo HuggingFace Git Setup
echo ====================================
echo.

cd hf-whatsapp

echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Creating commit...
git commit -m "Initial commit: WhatsApp Bot for HuggingFace Spaces"

echo.
echo ====================================
echo Git repository created!
echo ====================================
echo.
echo NEXT: Run deploy-to-hf.bat dengan username HuggingFace Anda
echo.
echo Example:
echo   deploy-to-hf.bat YOUR_USERNAME
echo.
pause
