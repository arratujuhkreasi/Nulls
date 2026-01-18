# Implementation Plan: SaaS ERP & AI untuk UMKM (Project Growth-Led)

## 1. Tech Stack Overview
- **Frontend & Main App:** Next.js 14 (App Router), Tailwind CSS, Shadcn/UI (untuk desain clean ala Dribbble), Framer Motion (untuk animasi grafik).
- **Backend (Main):** Next.js Server Actions (untuk CRUD ERP sederhana).
- **Backend (AI Engine):** Python (FastAPI) - khusus untuk menjalankan model LSTM & RAG WhatsApp.
- **Database:** PostgreSQL (via Supabase) - untuk Auth, Data Transaksi, dan User Data.
- **Payment:** Midtrans / Xendit (untuk handle subscription).
- **Auth:** Supabase Auth / NextAuth (Google Login & WA Login).

## 2. Project Structure
```text
/my-saas-project
  ├── /apps
  │    ├── /web (Next.js Application)
  │    │    ├── /app (Dashboard, Landing Page, Auth)
  │    │    ├── /components (UI Elements, Charts)
  │    │    └── /lib (Supabase Client, Helper Functions)
  │    └── /ai-engine (Python FastAPI)
  │         ├── /models (LSTM Model .h5 / .pkl)
  │         ├── /services (Forecasting Logic, RAG Logic)
  │         └── main.py (API Endpoints)
  ├── /packages (Shared UI configs if needed)
  └── /database (SQL Migrations)