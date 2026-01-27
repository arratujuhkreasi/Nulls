"use client";

import { useState } from "react";
import { FileText, FileSpreadsheet, Download, ChevronDown } from "lucide-react";
import { exportFinancePDF, exportFinanceExcel } from "@/lib/financeExport";

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

interface ExportButtonsProps {
    summary: FinanceSummary;
    expenses: Expense[];
}

export default function ExportButtons({ summary, expenses }: ExportButtonsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            exportFinancePDF(summary, expenses);
        } finally {
            setIsExporting(false);
            setIsOpen(false);
        }
    };

    const handleExportExcel = async () => {
        setIsExporting(true);
        try {
            exportFinanceExcel(summary, expenses);
        } finally {
            setIsExporting(false);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isExporting}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all flex items-center gap-2 font-medium disabled:opacity-50"
            >
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 disabled:opacity-50"
                        >
                            <FileText className="w-5 h-5 text-red-500" />
                            <span className="font-medium">Export PDF</span>
                        </button>
                        <button
                            onClick={handleExportExcel}
                            disabled={isExporting}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 disabled:opacity-50"
                        >
                            <FileSpreadsheet className="w-5 h-5 text-green-600" />
                            <span className="font-medium">Export Excel</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
