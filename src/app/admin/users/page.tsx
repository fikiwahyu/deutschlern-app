import { getUsersForTable } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersPage() {
  const data = await getUsersForTable();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">👥 User Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
