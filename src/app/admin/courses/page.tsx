import { getCoursesForTable } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

export default async function CoursesPage() {
  const data = await getCoursesForTable();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Course Management</h1>
        <Button>Add New Course</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
