import { getAllUsers } from "@/app/actions/admin";
import { UserTable } from "@/components/admin/UserTable";

export default async function AdminUsersPage() {
    const users = await getAllUsers();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
                <p className="text-slate-400">Kelola semua pengguna dan subscription mereka</p>
            </div>

            <UserTable initialUsers={users} />
        </div>
    );
}
