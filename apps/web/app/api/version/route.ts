import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: "2.0 (Odoo Style)",
        timestamp: new Date().toISOString(),
        message: "Deployment is successful if you see this."
    });
}
