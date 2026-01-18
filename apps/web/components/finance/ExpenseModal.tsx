"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { createExpense } from "@/app/actions/finance";

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ExpenseModal({ isOpen, onClose }: ExpenseModalProps) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        await createExpense(formData);

        setLoading(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-semibold text-lg text-gray-900">Add Expense</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                        <select
                            name="category"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white"
                        >
                            <option value="Operational">Operational (Rent/Bills)</option>
                            <option value="Wages">Wages / Salaries</option>
                            <option value="Marketing">Marketing / Ads</option>
                            <option value="Inventory">Inventory Purchase</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount (Rp)</label>
                            <input
                                name="amount"
                                type="number"
                                required
                                min="0"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</label>
                            <input
                                name="date"
                                type="date"
                                required
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description (Optional)</label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                            placeholder="e.g. Bayar listrik bulan Januari"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
