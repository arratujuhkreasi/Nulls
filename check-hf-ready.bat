@echo off
echo ====================================
echo Preparing HuggingFace Deployment
echo ====================================
echo.

cd hf-whatsapp

echo Creating deployment package...
echo.

REM Check if files exist
if exist "Dockerfile" (
    echo [OK] Dockerfile found
) else (
    echo [ERROR] Dockerfile missing!
    pause
    exit
)

if exist "README.md" (
    echo [OK] README.md found
) else (
    echo [ERROR] README.md missing!
    pause
    exit
)

if exist "package.json" (
    echo [OK] package.json found
) else (
    echo [ERROR] package.json missing!
    pause
    exit
)

if exist "lib\" (
    echo [OK] lib folder found
) else (
    echo [ERROR] lib folder missing!
    pause
    exit
)

if exist "scripts\" (
    echo [OK] scripts folder found
) else (
    echo [ERROR] scripts folder missing!
    pause
    exit
)

echo.
echo ====================================
echo All files ready for upload!
echo ====================================
echo.
echo NEXT STEPS:
echo 1. Open https://huggingface.co/spaces/YOUR_USERNAME/whatsapp-bot
echo 2. Click "Files" tab
echo 3. Click "Add file" -^> "Upload files"
echo 4. Drag and drop ALL files from: d:\PROJECT ARLAND JOVA\hf-whatsapp
echo 5. Commit changes
echo 6. Check Logs for QR code
echo 7. Scan QR with WhatsApp
echo.
echo Files location: %CD%
echo.
pause
