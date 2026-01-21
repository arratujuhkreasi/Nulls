import { NextResponse } from 'next/server';
import { isWhatsAppConnected } from '@/lib/whatsapp/client';

export async function GET() {
    return NextResponse.json({
        connected: isWhatsAppConnected(),
        timestamp: new Date().toISOString(),
    });
}
