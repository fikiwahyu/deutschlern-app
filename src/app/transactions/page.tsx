import { TransactionPage } from "@/components/page/TransactionPage";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";

// In a real application, this data would be fetched from an API or a session.
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe`,
};

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar user={mockUser} />
      <main className="flex-1 ml-64">
        {" "}
        {/* This margin accounts for the fixed sidebar width */}
        <TransactionPage />
      </main>
    </div>
  );
}
