"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Types
export interface ExportColumn {
    header: string;
    key: string;
    width?: number;
    format?: "currency" | "date" | "number" | "text";
}

export interface ExportOptions {
    title: string;
    subtitle?: string;
    fileName: string;
    columns: ExportColumn[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    summaryRows?: { label: string; value: string | number }[];
}

// Helper: Format value based on type
const formatValue = (value: unknown, format?: ExportColumn["format"]): string => {
    if (value === null || value === undefined) return "-";

    switch (format) {
        case "currency":
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(Number(value));
        case "date":
            return new Date(value as string).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        case "number":
            return new Intl.NumberFormat("id-ID").format(Number(value));
        default:
            return String(value);
    }
};

// Export to PDF
export const exportToPDF = (options: ExportOptions): void => {
    const { title, subtitle, fileName, columns, data, summaryRows } = options;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, pageWidth / 2, 20, { align: "center" });

    if (subtitle) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(subtitle, pageWidth / 2, 28, { align: "center" });
    }

    // Date
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(
        `Dicetak: ${new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })}`,
        pageWidth / 2,
        subtitle ? 35 : 28,
        { align: "center" }
    );

    // Table
    const tableData = data.map((row) =>
        columns.map((col) => formatValue(row[col.key], col.format))
    );

    autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body: tableData,
        startY: subtitle ? 42 : 35,
        styles: {
            fontSize: 9,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [79, 70, 229], // Indigo-600
            textColor: 255,
            fontStyle: "bold",
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252], // Slate-50
        },
        columnStyles: columns.reduce((acc, col, index) => {
            if (col.format === "currency" || col.format === "number") {
                acc[index] = { halign: "right" };
            }
            return acc;
        }, {} as Record<number, { halign: "right" | "left" | "center" }>),
    });

    // Summary rows if provided
    if (summaryRows && summaryRows.length > 0) {
        const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || 100;

        doc.setFontSize(10);
        doc.setTextColor(0);
        summaryRows.forEach((row, index) => {
            const y = finalY + 10 + index * 7;
            doc.setFont("helvetica", "bold");
            doc.text(row.label, 14, y);
            doc.setFont("helvetica", "normal");
            doc.text(
                typeof row.value === "number"
                    ? formatValue(row.value, "currency")
                    : String(row.value),
                pageWidth - 14,
                y,
                { align: "right" }
            );
        });
    }

    // Footer
    const pageCount = doc.internal.pages.length - 1; // pages array has offset
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `Halaman ${i} dari ${pageCount} | Nulls ERP`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: "center" }
        );
    }

    doc.save(`${fileName}.pdf`);
};

// Export to Excel
export const exportToExcel = (options: ExportOptions): void => {
    const { title, fileName, columns, data, summaryRows } = options;

    // Prepare data
    const wsData: (string | number)[][] = [];

    // Title row
    wsData.push([title]);
    wsData.push([
        `Dicetak: ${new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })}`,
    ]);
    wsData.push([]); // Empty row

    // Headers
    wsData.push(columns.map((col) => col.header));

    // Data rows
    data.forEach((row) => {
        wsData.push(
            columns.map((col) => {
                const value = row[col.key];
                if (col.format === "currency" || col.format === "number") {
                    return Number(value) || 0;
                }
                return formatValue(value, col.format);
            })
        );
    });

    // Summary rows
    if (summaryRows && summaryRows.length > 0) {
        wsData.push([]); // Empty row
        summaryRows.forEach((row) => {
            wsData.push([row.label, "", "", typeof row.value === "number" ? row.value : String(row.value)]);
        });
    }

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths
    ws["!cols"] = columns.map((col) => ({ wch: col.width || 15 }));

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");

    // Generate buffer
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${fileName}.xlsx`);
};
