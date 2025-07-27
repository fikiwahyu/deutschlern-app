import { getUsersForTable } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function UsersPage() {
  const data = await getUsersForTable();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
