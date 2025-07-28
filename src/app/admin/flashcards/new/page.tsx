"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFlashcardSet } from "@/lib/data";

export default function NewFlashcardSetPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) return;

    await createFlashcardSet({ title });
    router.push("/admin/flashcards");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Flashcard Set</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Set Title</Label>
            <Input
              id="title"
              placeholder="e.g., German A1 Vocabulary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Set</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
