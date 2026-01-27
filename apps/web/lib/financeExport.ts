"use client";

import { exportToPDF, exportToExcel, ExportColumn } from "./exportUtils";

// Types matching the finance actions
interface FinanceSummary {
    revenue: number;
    cogs: number;
    grossProfit: number;
    expenses: number;
    profit: number;
}

interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    created_at: string;
}

// Finance Report Columns
const expenseColumns: ExportColumn[] = [
    { header: "Tanggal", key: "date", width: 12, format: "date" },
    { header: "Deskripsi", key: "description", width: 30 },
    { header: "Kategori", key: "category", width: 15 },
    { header: "Jumlah", key: "amount", width: 18, format: "currency" },
];

// Export Finance Report to PDF
export const exportFinancePDF = (
    summary: FinanceSummary,
    expenses: Expense[]
): void => {
    const today = new Date().toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
    });

    exportToPDF({
        title: "Laporan Keuangan",
        subtitle: `Periode: ${today}`,
        fileName: `Laporan_Keuangan_${new Date().toISOString().slice(0, 10)}`,
        columns: expenseColumns,
        data: expenses,
        summaryRows: [
            { label: "Total Pendapatan", value: summary.revenue },
            { label: "HPP (COGS)", value: summary.cogs },
            { label: "Laba Kotor", value: summary.grossProfit },
            { label: "Total Biaya Operasional", value: summary.expenses },
            { label: "LABA BERSIH", value: summary.profit },
        ],
    });
};

// Export Finance Report to Excel
export const exportFinanceExcel = (
    summary: FinanceSummary,
    expenses: Expense[]
): void => {
    exportToExcel({
        title: "Laporan Keuangan Nulls ERP",
        fileName: `Laporan_Keuangan_${new Date().toISOString().slice(0, 10)}`,
        columns: expenseColumns,
        data: expenses,
        summaryRows: [
            { label: "Total Pendapatan", value: summary.revenue },
            { label: "HPP (COGS)", value: summary.cogs },
            { label: "Laba Kotor", value: summary.grossProfit },
            { label: "Total Biaya Operasional", value: summary.expenses },
            { label: "LABA BERSIH", value: summary.profit },
        ],
    });
};
