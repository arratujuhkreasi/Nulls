import Link from "next/link";
import { getTopCustomers } from "@/app/actions/customers";
import { Users, ArrowUpRight } from "lucide-react";

export async function TopCustomersWidget() {
    const topCustomers = await getTopCustomers(5);

    if (topCustomers.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 rounded-2xl">
                        <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Pelanggan Teratas</h3>
                        <p className="text-sm text-gray-500">Berdasarkan total pembelian</p>
                    </div>
                </div>
                <Link
                    href="/customers"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                >
                    Lihat Semua
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="space-y-3">
                {topCustomers.map((customer, index) => (
                    <div
                        key={customer.customer_id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-500">
                                {customer.total_orders} pesanan •{" "}
                                <span
                                    className={
                                        customer.customer_status === "active"
                                            ? "text-green-600"
                                            : customer.customer_status === "at_risk"
                                                ? "text-yellow-600"
                                                : "text-gray-400"
                                    }
                                >
                                    {customer.customer_status === "active"
                                        ? "Aktif"
                                        : customer.customer_status === "at_risk"
                                            ? "Berisiko"
                                            : "Tidak Aktif"}
                                </span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-indigo-600">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(customer.lifetime_value)}
                            </p>
                            <p className="text-xs text-gray-500">LTV</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
