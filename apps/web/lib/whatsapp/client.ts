import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState as makeMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import path from 'path';

let sock: ReturnType<typeof makeWASocket> | null = null;

const logger = pino({ level: 'silent' }); // Set to 'debug' for debugging

export async function initWhatsAppClient() {
    const authPath = path.join(process.cwd(), 'auth_info_baileys');
    const { state, saveCreds } = await makeMultiFileAuthState(authPath);

    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
        version,
        logger,
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        browser: Browsers.ubuntu('Chrome'),
        markOnlineOnConnect: true,
    });

    // Handle connection updates
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sock.ev.on('connection.update', async (update: any) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 Scan QR Code dengan WhatsApp Anda:');
            // QR code will be printed to terminal
        }

        if (connection === 'close') {
            const shouldReconnect =
                (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log(
                '❌ Koneksi ditutup karena:',
                lastDisconnect?.error,
                ', reconnecting:',
                shouldReconnect
            );

            if (shouldReconnect) {
                await initWhatsAppClient();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp terhubung!');
        }
    });

    // Save credentials whenever they update
    sock.ev.on('creds.update', saveCreds);

    // Handle incoming messages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sock.ev.on('messages.upsert', async ({ messages, type }: any) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
            if (!msg.message || msg.key.fromMe) continue;

            const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text;
            const sender = msg.key.remoteJid;

            console.log(`📨 Pesan dari ${sender}: ${messageText}`);

            // Auto-reply basic
            if (messageText?.toLowerCase().includes('halo')) {
                await sendMessage(sender!, 'Halo! 👋 Terima kasih telah menghubungi kami. Ada yang bisa kami bantu?');
            }
        }
    });

    return sock;
}

export async function sendMessage(to: string, message: string) {
    if (!sock) {
        throw new Error('WhatsApp client belum terinisialisasi');
    }

    // Format nomor WhatsApp
    const formattedNumber = to.includes('@s.whatsapp.net')
        ? to
        : `${to.replace(/\D/g, '')}@s.whatsapp.net`;

    await sock.sendMessage(formattedNumber, {
        text: message,
    });

    console.log(`✅ Pesan terkirim ke ${formattedNumber}`);
}

export async function sendMessageWithButtons(to: string, message: string, buttons: string[]) {
    if (!sock) {
        throw new Error('WhatsApp client belum terinisialisasi');
    }

    const formattedNumber = to.includes('@s.whatsapp.net')
        ? to
        : `${to.replace(/\D/g, '')}@s.whatsapp.net`;

    const buttonMessage = {
        text: message,
        footer: 'Powered by Nulls UMKM',
        buttons: buttons.map((btn, idx) => ({
            buttonId: `btn_${idx}`,
            buttonText: { displayText: btn },
            type: 1,
        })),
        headerType: 1,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await sock.sendMessage(formattedNumber, buttonMessage as any);
}

export function getWhatsAppClient() {
    return sock;
}

export function isWhatsAppConnected() {
    return sock !== null;
}
