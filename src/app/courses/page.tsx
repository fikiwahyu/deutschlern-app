import { CoursePage } from "@/components/page/CoursePage";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";

// In a real application, this data would be fetched from an API or a session.
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe`,
};
const onLogout = () => {
  // Handle logout logic here, e.g., clear session, redirect to login page, etc.
  redirect("/login");
};

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar user={mockUser} />
      <main className="flex-1 ml-64">
        {" "}
        {/* This margin accounts for the fixed sidebar width */}
        <CoursePage />
        {/* The CoursePage component will render the course content */}
      </main>
    </div>
  );
}
