import { User } from "./auth";

// You can expand this with more detailed course information
export interface Course {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  published: boolean;
  studentCount: number;
}

// Mock Data
const users: User[] = [
  { id: "1", name: "Alice Admin", email: "alice@example.com", role: "admin" },
  { id: "2", name: "Bob Director", email: "bob@example.com", role: "director" },
  {
    id: "3",
    name: "Charlie Manager",
    email: "charlie@example.com",
    role: "manager",
  },
  { id: "4", name: "Diana User", email: "diana@example.com", role: "user" },
  {
    id: "5",
    name: "Goethe Institut",
    email: "goethe@example.com",
    role: "institution",
  },
  { id: "6", name: "Frank User", email: "frank@example.com", role: "user" },
];

const courses: Course[] = [
  {
    id: "c1",
    title: "German for Beginners",
    level: "A1",
    published: true,
    studentCount: 150,
  },
  {
    id: "c2",
    title: "Intermediate German",
    level: "B1",
    published: true,
    studentCount: 89,
  },
  {
    id: "c3",
    title: "Advanced Grammar",
    level: "C1",
    published: false,
    studentCount: 25,
  },
];

// Simulate a network request
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API Functions
export async function getUsers() {
  await sleep(500);
  return users;
}

export async function getCourses() {
  await sleep(500);
  return courses;
}

export async function getDashboardStats() {
  await sleep(300);
  return {
    totalUsers: users.length,
    totalCourses: courses.length,
    publishedCourses: courses.filter((c) => c.published).length,
    newSignups: 5, // mock static value
  };
}

export type UserWithStatus = User & {
  status: "active" | "invited";
};

export async function getUsersForTable(): Promise<UserWithStatus[]> {
  await sleep(500);
  return users.map((u) => ({
    ...u,
    status: Math.random() > 0.5 ? "active" : "invited",
  }));
}

export type CourseWithStatus = Course & {
  status: "published" | "draft";
};

export async function getCoursesForTable(): Promise<CourseWithStatus[]> {
  await sleep(500);
  return courses.map((c) => ({
    ...c,
    status: c.published ? "published" : "draft",
  }));
}

export async function getRecentUsers() {
  await sleep(400);
  // Return the 5 most recent users
  return users.slice(-5).reverse();
}

export async function getRecentCourses() {
  await sleep(400);
  // Return the 5 most recent courses
  return courses.slice(-5).reverse();
}

export async function createCourse(courseData: Omit<Course, 'id' | 'studentCount' | 'published'>) {
  await sleep(500);
  const newCourse: Course = {
    id: `c${courses.length + 1}`,
    ...courseData,
    studentCount: 0,
    published: false,
  };
  courses.push(newCourse);
  return newCourse;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  await sleep(200);
  return courses.find((c) => c.id === id);
}

export async function updateCourse(id: string, data: Partial<Course>): Promise<Course | undefined> {
  await sleep(500);
  const courseIndex = courses.findIndex((c) => c.id === id);
  if (courseIndex === -1) {
    return undefined;
  }
  courses[courseIndex] = { ...courses[courseIndex], ...data };
  return courses[courseIndex];
}

export async function createLesson(courseId: string, lessonData: Omit<Lesson, 'id' | 'courseId'>) {
  await sleep(500);
  const newLesson: Lesson = {
    id: `l${lessons.length + 1}`,
    courseId,
    ...lessonData,
  };
  lessons.push(newLesson);
  return newLesson;
}

export async function getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
  await sleep(200);
  return lessons.filter((l) => l.courseId === courseId);
}

export async function getLessonById(id: string): Promise<Lesson | undefined> {
  await sleep(200);
  return lessons.find((l) => l.id === id);
}

export async function updateLesson(id: string, data: Partial<Lesson>): Promise<Lesson | undefined> {
  await sleep(500);
  const lessonIndex = lessons.findIndex((l) => l.id === id);
  if (lessonIndex === -1) {
    return undefined;
  }
  lessons[lessonIndex] = { ...lessons[lessonIndex], ...data };
  return lessons[lessonIndex];
}

export async function createQuiz(courseId: string, quizData: Omit<Quiz, 'id' | 'courseId'>) {
  await sleep(500);
  const newQuiz: Quiz = {
    id: `q${quizzes.length + 1}`,
    courseId,
    ...quizData,
  };
  quizzes.push(newQuiz);
  return newQuiz;
}

export async function getQuizzesByCourseId(courseId: string): Promise<Quiz[]> {
  await sleep(200);
  return quizzes.filter((q) => q.courseId === courseId);
}

export async function getQuizById(id: string): Promise<Quiz | undefined> {
  await sleep(200);
  return quizzes.find((q) => q.id === id);
}

export async function updateQuiz(id: string, data: Partial<Quiz>): Promise<Quiz | undefined> {
  await sleep(500);
  const quizIndex = quizzes.findIndex((q) => q.id === id);
  if (quizIndex === -1) {
    return undefined;
  }
  quizzes[quizIndex] = { ...quizzes[quizIndex], ...data };
  return quizzes[quizIndex];
}

export interface RevenueData {
  month: string;
  totalRevenue: number;
}

const revenueData: RevenueData[] = [
  { month: "Jan", totalRevenue: 1000 },
  { month: "Feb", totalRevenue: 1200 },
  { month: "Mar", totalRevenue: 1500 },
  { month: "Apr", totalRevenue: 1300 },
  { month: "May", totalRevenue: 1700 },
  { month: "Jun", totalRevenue: 1900 },
  { month: "Jul", totalRevenue: 2200 },
  { month: "Aug", totalRevenue: 2000 },
  { month: "Sep", totalRevenue: 2500 },
  { month: "Oct", totalRevenue: 2300 },
  { month: "Nov", totalRevenue: 2700 },
  { month: "Dec", totalRevenue: 3000 },
];

export async function getRevenueData(): Promise<RevenueData[]> {
  await sleep(500);
  return revenueData;
}

