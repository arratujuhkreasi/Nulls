import { getProducts } from "@/app/actions/inventory";
import { ProductTable } from "@/components/inventory/ProductTable";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
    const products = await getProducts();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
                <p className="text-gray-500">Track your stock, manage prices, and organize your products.</p>
            </div>

            <ProductTable products={products} />
        </div>
    );
}
