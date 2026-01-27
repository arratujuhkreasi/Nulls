@echo off
echo ====================================
echo HuggingFace Deployment Helper
echo ====================================
echo.

REM Check if username is provided
if "%1"=="" (
    echo ERROR: Username tidak diberikan!
    echo.
    echo Usage: deploy-to-hf.bat YOUR_HF_USERNAME
    echo Example: deploy-to-hf.bat arlandjova
    echo.
    pause
    exit /b 1
)

set HF_USERNAME=%1
set SPACE_NAME=whatsapp-bot

echo Username: %HF_USERNAME%
echo Space Name: %SPACE_NAME%
echo.
echo ====================================
echo Step 1: Setup Git Remote
echo ====================================

cd hf-whatsapp

REM Remove existing remote if any
git remote remove origin 2>nul

REM Add HuggingFace remote
git remote add origin https://huggingface.co/spaces/%HF_USERNAME%/%SPACE_NAME%

echo [OK] Remote added: https://huggingface.co/spaces/%HF_USERNAME%/%SPACE_NAME%
echo.

echo ====================================
echo Step 2: Push to HuggingFace
echo ====================================
echo.
echo IMPORTANT: Anda akan diminta login HuggingFace
echo Username: %HF_USERNAME%
echo Password: [YOUR_HF_TOKEN or PASSWORD]
echo.
echo Dapatkan HF Token di: https://huggingface.co/settings/tokens
echo.
pause

REM Push to HuggingFace
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================
    echo SUCCESS! Bot Uploaded
    echo ====================================
    echo.
    echo Space URL: https://huggingface.co/spaces/%HF_USERNAME%/%SPACE_NAME%
    echo.
    echo NEXT STEPS:
    echo 1. Buka URL di atas
    echo 2. Tunggu build selesai (3-5 menit)
    echo 3. Cek tab "Logs" untuk QR code
    echo 4. Scan QR dengan WhatsApp
    echo.
) else (
    echo.
    echo ====================================
    echo ERROR: Upload Gagal!
    echo ====================================
    echo.
    echo Possible issues:
    echo 1. Space belum dibuat di HuggingFace
    echo 2. Username salah
    echo 3. Credentials salah
    echo.
    echo CARA FIX:
    echo 1. Buat Space dulu: https://huggingface.co/new-space
    echo 2. Space name HARUS: %SPACE_NAME%
    echo 3. SDK HARUS: Docker
    echo 4. Coba lagi!
    echo.
)

pause
