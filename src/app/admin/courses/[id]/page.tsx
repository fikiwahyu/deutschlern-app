import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseById, getLessonsByCourseId, getQuizzesByCourseId } from "@/lib/data";
import { notFound } from "next/navigation";
import { PlusCircle, BookOpen, HelpCircle } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourseById(params.id);
  const lessons = await getLessonsByCourseId(params.id);
  const quizzes = await getQuizzesByCourseId(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-lg text-muted-foreground">Level {course.level}</p>
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="mt-2 text-muted-foreground">
          A central hub for managing all content related to this course.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Lessons Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6" />
              <CardTitle>Lessons</CardTitle>
            </div>
            <Link href={`/admin/courses/${course.id}/lessons/new`}>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Lesson
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {lessons.length > 0 ? (
              <ul className="space-y-3">
                {lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-center justify-between rounded-md border p-3">
                    <span className="font-medium">{lesson.title}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/courses/${course.id}/lessons/${lesson.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>No lessons yet.</p>
                <Button size="sm" className="mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Lesson
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quizzes Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6" />
              <CardTitle>Quizzes</CardTitle>
            </div>
            <Link href={`/admin/courses/${course.id}/quizzes/new`}>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Quiz
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {quizzes.length > 0 ? (
              <ul className="space-y-3">
                {quizzes.map((quiz) => (
                  <li key={quiz.id} className="flex items-center justify-between rounded-md border p-3">
                    <span className="font-medium">{quiz.title}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/courses/${course.id}/quizzes/${quiz.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>No quizzes yet.</p>
                <Button size="sm" className="mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

