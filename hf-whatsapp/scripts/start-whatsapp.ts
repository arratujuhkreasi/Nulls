import { initWhatsAppClient } from '../lib/whatsapp/client';

async function main() {
    console.log('🚀 Menginisialisasi WhatsApp Client...');
    console.log('📱 Silakan scan QR Code yang muncul dengan WhatsApp Anda\n');

    try {
        await initWhatsAppClient();

        console.log('\n✅ WhatsApp Bot siap digunakan!');
        console.log('📨 Bot akan auto-reply pesan yang masuk');
        console.log('🔌 Bot running 24/7...\n');

        // Keep process running indefinitely
        await new Promise(() => {
            // This promise never resolves, keeping the process alive
        });

    } catch (error) {
        console.error('❌ Error:', error);
        console.error('Stack:', error instanceof Error ? error.stack : '');

        // Wait before exit to see error in logs
        await new Promise(resolve => setTimeout(resolve, 5000));
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping WhatsApp Bot...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n\n👋 WhatsApp Bot terminated');
    process.exit(0);
});

main().catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
});
