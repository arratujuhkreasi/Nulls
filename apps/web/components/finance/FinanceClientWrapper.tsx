"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ExpenseModal } from "./ExpenseModal";

export default function FinanceClientWrapper() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg transition-all flex items-center gap-2 font-medium"
            >
                <Plus className="w-5 h-5" />
                Add Expense
            </button>

            <ExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
