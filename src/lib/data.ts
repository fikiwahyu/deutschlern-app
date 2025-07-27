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
