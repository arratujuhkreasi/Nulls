import { getFinancialSummary, getExpenses } from "@/app/actions/finance";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import FinanceClientWrapper from "@/components/finance/FinanceClientWrapper";
import { BackButton } from "@/components/ui/BackButton";

export default async function FinancePage() {
    const summary = await getFinancialSummary();
    const { expenses } = await getExpenses(); // Destructure expenses from pagination object

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="mb-6">
                <BackButton />
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Ringkasan Keuangan</h1>
                    <p className="text-gray-500">Lacak profitabilitas bisnis Anda secara real-time.</p>
                </div>
                <FinanceClientWrapper />
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                {/* Revenue */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                    <div className="relative">
                        <div className="p-3 bg-green-100 w-fit rounded-2xl mb-4">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Pendapatan</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.revenue)}
                        </h3>
                    </div>
                </div>

                {/* COGS / HPP */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                    <div className="relative">
                        <div className="p-3 bg-orange-100 w-fit rounded-2xl mb-4">
                            <DollarSign className="w-6 h-6 text-orange-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">HPP (COGS)</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.cogs)}
                        </h3>
                    </div>
                </div>

                {/* Gross Profit */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                    <div className="relative">
                        <div className="p-3 bg-blue-100 w-fit rounded-2xl mb-4">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Laba Kotor</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.grossProfit)}
                        </h3>
                    </div>
                </div>

                {/* Expenses */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                    <div className="relative">
                        <div className="p-3 bg-red-100 w-fit rounded-2xl mb-4">
                            <TrendingDown className="w-6 h-6 text-red-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Biaya Operasional</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.expenses)}
                        </h3>
                    </div>
                </div>

                {/* Net Profit */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl shadow-lg relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12" />
                    <div className="relative">
                        <div className="p-3 bg-white/20 w-fit rounded-2xl mb-4 backdrop-blur-sm">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-medium text-indigo-100 mb-1">Laba Bersih</p>
                        <h3 className="text-2xl font-bold">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.profit)}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Pengeluaran Terbaru</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4 text-right">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {expenses.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                        Belum ada pengeluaran tercatat.
                                    </td>
                                </tr>
                            ) : (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                expenses.map((expense: any) => (
                                    <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-gray-600 font-medium">
                                            {new Date(expense.date).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{expense.description || '-'}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-red-600">
                                            - {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(expense.amount)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
