"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFlashcardSetById, updateFlashcardSet, FlashcardSet } from "@/lib/data";

export default function EditFlashcardSetPage() {
  const router = useRouter();
  const params = useParams();
  const setId = params.id as string;

  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (setId) {
      getFlashcardSetById(setId).then(data => {
        if (data) {
          setFlashcardSet(data);
          setTitle(data.title);
        }
      });
    }
  }, [setId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !flashcardSet) return;

    await updateFlashcardSet(flashcardSet.id, { ...flashcardSet, title });
    router.push("/admin/flashcards");
  };

  if (!flashcardSet) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Flashcard Set</CardTitle>
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
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
