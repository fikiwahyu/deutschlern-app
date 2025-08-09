import { AuthForm } from "@/components/auth/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={"https://api.dicebear.com/7.x/avataaars/svg?seed=social"}
              alt="CoverBook"
              className="w-12 h-12"
            />
            <span className="text-2xl">CoverBook</span>
          </div>
          <p className="text-muted-foreground">
            Welcome to your learning journey
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
