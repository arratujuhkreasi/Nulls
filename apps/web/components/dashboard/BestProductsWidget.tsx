import Link from "next/link";
import { getBestSellers } from "@/app/actions/analytics";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export async function BestProductsWidget() {
    const bestSellers = await getBestSellers(5);

    if (bestSellers.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-2xl">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Produk Terlaris</h3>
                        <p className="text-sm text-gray-500">Produk terlaris bulan ini</p>
                    </div>
                </div>
                <Link
                    href="/analytics"
                    className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                >
                    Lihat Semua
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="space-y-3">
                {bestSellers.map((product, index) => (
                    <div
                        key={product.product_id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center text-sm">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">
                                {product.total_sold} terjual • Margin {product.profit_margin_percentage}%
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-green-600">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                }).format(product.total_revenue)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
