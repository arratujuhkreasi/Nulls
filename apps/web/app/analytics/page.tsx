import { getBestSellers, getSlowMovers, getLowStockProducts, getProductAnalyticsSummary } from "@/app/actions/analytics";
import { BackButton } from "@/components/ui/BackButton";
import { TrendingUp, AlertTriangle, PackageX, DollarSign, Package, TrendingDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
    const [bestSellers, slowMovers, lowStock, summary] = await Promise.all([
        getBestSellers(5),
        getSlowMovers(5),
        getLowStockProducts(),
        getProductAnalyticsSummary()
    ]);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="mb-6">
                <BackButton />
            </div>
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Produk</h1>
                <p className="text-gray-500">Analisis performa produk untuk optimalkan penjualan.</p>
            </div>

            {/* Summary Stats */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-green-100 w-fit rounded-2xl mb-4">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.total_revenue)}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-indigo-100 w-fit rounded-2xl mb-4">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Profit</p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.total_profit)}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-purple-100 w-fit rounded-2xl mb-4">
                                <Package className="w-6 h-6 text-purple-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Items Terjual</p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {summary.total_items_sold.toLocaleString('id-ID')}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                        <div className="relative">
                            <div className="p-3 bg-yellow-100 w-fit rounded-2xl mb-4">
                                <TrendingDown className="w-6 h-6 text-yellow-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Avg Profit Margin</p>
                            <h3 className="text-3xl font-bold text-gray-900">{summary.avg_profit_margin.toFixed(1)}%</h3>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Best Sellers */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-green-100 rounded-2xl">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Best Sellers</h2>
                            <p className="text-sm text-gray-500">Produk terlaris berdasarkan revenue</p>
                        </div>
                    </div>

                    {bestSellers.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Belum ada data penjualan</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bestSellers.map((product, index) => (
                                <div key={product.product_id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{product.name}</p>
                                        <p className="text-sm text-gray-500">{product.total_sold} terjual</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.total_revenue)}
                                        </p>
                                        <p className="text-xs text-gray-500">Margin {product.profit_margin_percentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Slow Movers */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-yellow-100 rounded-2xl">
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Slow Movers</h2>
                            <p className="text-sm text-gray-500">Produk dengan penjualan rendah</p>
                        </div>
                    </div>

                    {slowMovers.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Semua produk terjual dengan baik!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {slowMovers.map((product) => (
                                <div key={product.product_id} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{product.name}</p>
                                        <p className="text-sm text-gray-500">Stock: {product.stock} • Terjual: {product.total_sold}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-yellow-700">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.sell_price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Low Stock Alerts */}
            {lowStock.length > 0 && (
                <div className="bg-white rounded-3xl border border-red-200 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-100 rounded-2xl">
                            <PackageX className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Low Stock Alert</h2>
                            <p className="text-sm text-gray-500">{lowStock.length} produk perlu restock</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lowStock.map((product) => (
                            <div key={product.product_id} className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-200">
                                <PackageX className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{product.name}</p>
                                    <p className="text-sm text-red-600 font-semibold">Stock tersisa: {product.stock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
