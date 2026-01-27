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
                { error: 'WhatsApp belum terhubung' },
                { status: 503 }
            );
        }

        const { message, customerIds } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Parameter "message" diperlukan' },
                { status: 400 }
            );
        }

        // Get customers from database
        let query = supabase
            .from('customers')
            .select('id, name, phone')
            .eq('user_id', user.id)
            .not('phone', 'is', null);

        if (customerIds && customerIds.length > 0) {
            query = query.in('id', customerIds);
        }

        const { data: customers, error } = await query;

        if (error) {
            return NextResponse.json(
                { error: 'Gagal mengambil data customer' },
                { status: 500 }
            );
        }

        const results: { success: string[]; failed: string[] } = {
            success: [],
            failed: [],
        };

        // Send messages with delay to avoid spam detection
        for (const customer of customers || []) {
            if (!customer.phone) continue;

            try {
                const personalizedMessage = message.replace('{name}', customer.name);
                await sendMessage(customer.phone, personalizedMessage);
                results.success.push(customer.name);

                // Delay 2-4 detik antar pesan untuk menghindari spam
                await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
            } catch (err) {
                console.error(`Gagal kirim ke ${customer.name}:`, err);
                results.failed.push(customer.name);
            }
        }

        return NextResponse.json({
            success: true,
            total: customers?.length || 0,
            sent: results.success.length,
            failed: results.failed.length,
            results,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error broadcast WhatsApp:', error);
        return NextResponse.json(
            { error: error.message || 'Gagal broadcast pesan' },
            { status: 500 }
        );
    }
}
