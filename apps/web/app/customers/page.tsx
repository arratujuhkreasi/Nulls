import { getCustomers, getCustomerSummary } from "@/app/actions/customers";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { AddCustomerButton } from "@/components/customers/AddCustomerButton";
import { Users, TrendingUp, UserX, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
    const { customers, total } = await getCustomers();
    const summary = await getCustomerSummary();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Customer</h1>
                    <p className="text-gray-500">Lacak pelanggan dan tingkatkan loyalitas bisnis Anda.</p>
                </div>
                <AddCustomerButton />
            </div>

            {/* Summary Stats */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Total Customers */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-indigo-100 w-fit rounded-2xl mb-4">
                                <Users className="w-6 h-6 text-indigo-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Customer</p>
                            <h3 className="text-3xl font-bold text-gray-900">{summary.total}</h3>
                        </div>
                    </div>

                    {/* Active Customers */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-green-100 w-fit rounded-2xl mb-4">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Customer Aktif</p>
                            <h3 className="text-3xl font-bold text-gray-900">{summary.active}</h3>
                        </div>
                    </div>

                    {/* At Risk */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-yellow-100 w-fit rounded-2xl mb-4">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Berisiko</p>
                            <h3 className="text-3xl font-bold text-gray-900">{summary.at_risk}</h3>
                        </div>
                    </div>

                    {/* Dormant */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-gray-100 w-fit rounded-2xl mb-4">
                                <UserX className="w-6 h-6 text-gray-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Tidak Aktif</p>
                            <h3 className="text-3xl font-bold text-gray-900">{summary.dormant}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <CustomerTable customers={customers} total={total} />
            </div>
        </div>
    );
}
