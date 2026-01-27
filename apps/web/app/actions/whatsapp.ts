"use server";

export async function sendWhatsAppMessage(to: string, message: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, message }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || 'Gagal mengirim pesan' };
        }

        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { error: error.message || 'Terjadi kesalahan' };
    }
}

export async function broadcastWhatsAppMessage(message: string, customerIds?: string[]) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp/broadcast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, customerIds }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || 'Gagal broadcast pesan' };
        }

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { error: error.message || 'Terjadi kesalahan' };
    }
}

export async function getWhatsAppStatus() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp/status`);
        const data = await response.json();
        return data;
    } catch {
        return { connected: false, error: 'Gagal mengecek status' };
    }
}

// Helper: Send order confirmation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendOrderConfirmation(orderId: string, customerPhone: string, orderDetails: any) {
    const message = `
✅ *Pesanan Baru Diterima!*

📦 Order ID: #${orderId}
💰 Total: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(orderDetails.total)}

${orderDetails.items?.map((item: { name: string; quantity: number }) => `• ${item.name} (${item.quantity}x)`).join('\n')}

Terima kasih telah berbelanja! 🙏
Pesanan Anda sedang diproses.
    `.trim();

    return await sendWhatsAppMessage(customerPhone, message);
}
