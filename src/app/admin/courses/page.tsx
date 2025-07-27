import { getCoursesForTable } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CoursesPage() {
  const data = await getCoursesForTable();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">📚 Course Management</h1>
        <Link href="/admin/courses/new">
          <Button>✨ Add New Course</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
