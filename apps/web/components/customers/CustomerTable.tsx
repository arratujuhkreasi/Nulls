"use client";

import { useState } from "react";
import { Customer } from "@/app/actions/customers";
import { Edit2, Trash2, Eye, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { DeleteCustomerButton } from "./DeleteCustomerButton";
import { EditCustomerModal } from "./EditCustomerModal";

interface CustomerTableProps {
    customers: Customer[];
    total: number;
}

export function CustomerTable({ customers, total }: CustomerTableProps) {
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    if (customers.length === 0) {
        return (
            <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada customer</h3>
                <p className="text-gray-500">Mulai tambahkan customer pertama Anda!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Daftar Customer ({total})</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Nama</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kontak</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Lokasi</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Bergabung</th>
                            <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-6">
                                    <div>
                                        <p className="font-semibold text-gray-900">{customer.name}</p>
                                        {customer.email && (
                                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                <Mail className="w-3 h-3" />
                                                {customer.email}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {customer.phone ? (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            {customer.phone}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-sm">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    {customer.address ? (
                                        <div className="flex items-center gap-2 text-sm text-gray-600 max-w-xs truncate">
                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                            {customer.address}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-sm">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    {new Date(customer.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/customers/${customer.id}`}
                                            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group"
                                            title="Lihat Detail"
                                        >
                                            <Eye className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                                        </Link>
                                        <button
                                            onClick={() => setEditingCustomer(customer)}
                                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                        </button>
                                        <DeleteCustomerButton customerId={customer.id} customerName={customer.name} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingCustomer && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onClose={() => setEditingCustomer(null)}
                />
            )}
        </div>
    );
}

function Users({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}
