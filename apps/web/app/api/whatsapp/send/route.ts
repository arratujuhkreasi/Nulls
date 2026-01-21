import { NextRequest, NextResponse } from 'next/server';
import { sendMessage, isWhatsAppConnected } from '@/lib/whatsapp/client';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!isWhatsAppConnected()) {
            return NextResponse.json(
                { error: 'WhatsApp belum terhubung. Silakan scan QR code terlebih dahulu.' },
                { status: 503 }
            );
        }

        const { to, message } = await request.json();

        if (!to || !message) {
            return NextResponse.json(
                { error: 'Parameter "to" dan "message" diperlukan' },
                { status: 400 }
            );
        }

        await sendMessage(to, message);

        return NextResponse.json({
            success: true,
            message: 'Pesan berhasil dikirim',
        });
    } catch (error: any) {
        console.error('Error mengirim pesan WhatsApp:', error);
        return NextResponse.json(
            { error: error.message || 'Gagal mengirim pesan' },
            { status: 500 }
        );
    }
}
