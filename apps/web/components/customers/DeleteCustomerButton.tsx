"use client";

import { useState } from "react";
import { deleteCustomer } from "@/app/actions/customers";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteCustomerButtonProps {
    customerId: string;
    customerName: string;
}

export function DeleteCustomerButton({ customerId, customerName }: DeleteCustomerButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteCustomer(customerId);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || "Gagal menghapus customer");
            setIsDeleting(false);
            setIsConfirming(false);
        }
    };

    if (isConfirming) {
        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsConfirming(false)}
                    disabled={isDeleting}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                    Batal
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                    {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setIsConfirming(true)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
            title="Hapus"
        >
            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
        </button>
    );
}
