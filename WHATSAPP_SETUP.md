# WhatsApp Chatbot Setup Guide

## 📦 Instalasi Dependencies

Jalankan command berikut di terminal (CMD atau PowerShell Administrator):

```bash
cd apps/web
npm install @whiskeysockets/baileys@latest qrcode-terminal pino @hapi/boom
```

## 🚀 Cara Menjalankan WhatsApp Bot

### 1. **Tambahkan Environment Variable**

Edit file `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. **Buat File Starter Script**

Buat file `apps/web/scripts/start-whatsapp.ts`:

```typescript
import { initWhatsAppClient } from '../lib/whatsapp/client';

async function main() {
    console.log('🚀 Menginisialisasi WhatsApp Client...');
    console.log('📱 Silakan scan QR Code yang muncul dengan WhatsApp Anda');
    
    await initWhatsAppClient();
    
    console.log('✅ WhatsApp Bot siap digunakan!');
}

main().catch(console.error);
```

### 3. **Jalankan Bot**

```bash
npx tsx scripts/start-whatsapp.ts
```

### 4. **Scan QR Code**

- QR Code akan muncul di terminal
- Buka WhatsApp di HP Anda
- Pilih **Linked Devices** → **Link a Device**
- Scan QR Code

### 5. **Test Kirim Pesan**

Setelah terhubung, test dengan API:

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d "{\"to\":\"628123456789\",\"message\":\"Test pesan dari bot!\"}"
```

## 📋 Fitur Yang Tersedia

### 1. **Send Message** `/api/whatsapp/send`

```typescript
POST /api/whatsapp/send
{
  "to": "628123456789",
  "message": "Halo dari Nulls UMKM!"
}
```

### 2. **Broadcast to Customers** `/api/whatsapp/broadcast`

```typescript
POST /api/whatsapp/broadcast
{
  "message": "Promo spesial hari ini! Diskon 50% untuk semua produk. {name}, jangan lewatkan!",
  "customerIds": ["uuid1", "uuid2"] // Optional
}
```

### 3. **Check Status** `/api/whatsapp/status`

```typescript
GET /api/whatsapp/status
```

## 🤖 Auto-Reply

Bot sudah dilengkapi dengan auto-reply sederhana:

- Jika customer kirim "halo" → Bot akan balas otomatis

Customize di `lib/whatsapp/client.ts` line 70-76.

## 💡 Use Cases

### 1. **Notifikasi Order Otomatis**

```typescript
import { sendOrderConfirmation } from '@/app/actions/whatsapp';

// Setelah order dibuat
await sendOrderConfirmation(orderId, customerPhone, orderDetails);
```

### 2. **Broadcast Promo**

```typescript
import { broadcastWhatsAppMessage } from '@/app/actions/whatsapp';

// Broadcast ke semua customer
const result = await broadcastWhatsAppMessage(
  "🎉 Flash Sale! Diskon 50% hari ini saja!"
);

console.log(`Terkirim ke ${result.sent} customer`);
```

### 3. **Customer Service dengan AI**

Edit `lib/whatsapp/client.ts` untuk integrate dengan Groq AI:

```typescript
const aiResponse = await generateAIReply(messageText);
await sendMessage(sender, aiResponse);
```

## ⚠️ Catatan Penting

1. **Jangan Spam**: 
   - Max 100-200 pesan/hari untuk akun personal
   - Delay 2-4 detik antar pesan (sudah otomatis)

2. **Resiko Banned**:
   - Gunakan nomor khusus bisnis
   - Jangan kirim ke nomor yang tidak opt-in
   - Aktifkan di jam kerja saja

3. **Server Always-On**:
   - Bot harus running terus
   - Deploy ke VPS atau Railway.app
   - Atau jalankan di komputer yang selalu nyala

## 🔧 Troubleshooting

### QR Code tidak muncul?
```bash
# Set log level ke debug
// Edit client.ts line 11:
const logger = pino({ level: 'debug' });
```

### Connection closed?
- Session tersimpan di folder `auth_info_baileys`
- Jangan hapus folder ini
- Jika error, hapus folder dan scan ulang

### Pesan tidak terkirim?
- Cek apakah WhatsApp masih connected
- Hit endpoint `/api/whatsapp/status`
- Restart script jika perlu

## 📁 File Structure

```
apps/web/
├── lib/whatsapp/
│   └── client.ts          # WhatsApp client core
├── app/api/whatsapp/
│   ├── send/route.ts      # API kirim pesan
│   ├── broadcast/route.ts # API broadcast
│   └── status/route.ts    # API status check
├── app/actions/
│   └── whatsapp.ts        # Server actions
└── scripts/
    └── start-whatsapp.ts  # Bot starter
```

## 🚀 Deployment

### Option 1: Railway.app (Gratis)
1. Push code ke GitHub
2. Deploy di Railway
3. QR scan via Railway logs

### Option 2: VPS
```bash
# Install PM2
npm install -g pm2

# Run bot with PM2
pm2 start scripts/start-whatsapp.ts --name whatsapp-bot

# Auto-start on reboot
pm2 save
pm2 startup
```

---

**Status**: ✅ Ready to use (setelah install dependencies)
**Cost**: $0 (100% Gratis!)
**Maintenance**: Low
