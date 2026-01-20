import { getFinancialSummary, getExpenses } from "@/app/actions/finance";
import { ExpenseModal } from "@/components/finance/ExpenseModal";
import { Plus, TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import FinanceClientWrapper from "@/components/finance/FinanceClientWrapper";

export default async function FinancePage() {
    const summary = await getFinancialSummary();
    const { expenses } = await getExpenses(); // Destructure expenses from pagination object

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Overview</h1>
                    <p className="text-gray-500">Track your business profitability in real-time.</p>
                </div>
                <FinanceClientWrapper />
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                    <div className="relative">
                        <div className="p-3 bg-green-100 w-fit rounded-2xl mb-4">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summary.revenue)}
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
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Expenses</p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summary.expenses)}
                        </h3>
                    </div>
                </div>

                {/* Profit */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl shadow-lg relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12" />
                    <div className="relative">
                        <div className="p-3 bg-white/20 w-fit rounded-2xl mb-4 backdrop-blur-sm">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-medium text-indigo-100 mb-1">Net Profit</p>
                        <h3 className="text-3xl font-bold">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summary.profit)}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Expenses Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {expenses.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                        No expenses recorded yet.
                                    </td>
                                </tr>
                            ) : (
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
