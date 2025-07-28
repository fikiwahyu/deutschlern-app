import { getFlashcardsForTable } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FlashcardsPage() {
  const data = await getFlashcardsForTable();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🎴 Flashcard Management</h1>
        <Link href="/admin/flashcards/new">
          <Button>✨ Add New Flashcard Set</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
