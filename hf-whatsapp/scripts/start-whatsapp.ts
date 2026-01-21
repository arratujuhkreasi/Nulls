import { initWhatsAppClient } from '../lib/whatsapp/client';

async function main() {
    console.log('🚀 Menginisialisasi WhatsApp Client...');
    console.log('📱 Silakan scan QR Code yang muncul dengan WhatsApp Anda\n');

    try {
        await initWhatsAppClient();

        console.log('\n✅ WhatsApp Bot siap digunakan!');
        console.log('📨 Bot akan auto-reply pesan yang masuk');
        console.log('🔌 Tekan Ctrl+C untuk stop bot\n');

        // Keep process running
        process.on('SIGINT', () => {
            console.log('\n\n👋 Stopping WhatsApp Bot...');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main();
