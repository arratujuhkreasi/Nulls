import { getProducts } from "@/app/actions/inventory";
import { ProductTable } from "@/components/inventory/ProductTable";
import { BackButton } from "@/components/ui/BackButton";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
    const { products } = await getProducts(); // Destructure products from pagination object


    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-6">
                <BackButton />
            </div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Inventaris</h1>
                <p className="text-gray-500">Lacak stok, kelola harga, dan atur produk Anda.</p>
            </div>

            <ProductTable products={products} />
        </div>
    );
}
