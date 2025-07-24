"use client";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LandingPage } from "@/components/LandingPage";
import { AuthPage } from "@/components/AuthPage";
import { Dashboard } from "@/components/Dashboard";
import { FlashcardPage } from "@/components/FlashcardPage";
import { PracticePage } from "@/components/PracticePage";
import { ExamPage } from "@/components/ExamPage";
import { AnalyticsPage } from "@/components/AnalyticsPage";
import { ProfilePage } from "@/components/ProfilePage";
import { TransactionPage } from "@/components/TransactionPage";
import { SimulationPage } from "@/components/SimulationPage";
import { CoursePage } from "@/components/CoursePage";
import { SettingsPage } from "@/components/SettingsPage";
import { CreditsPage } from "@/components/CreditsPage";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

// Mock authentication state
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout };
};

function App() {
  const { isAuthenticated, user, login, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage onLogin={login} />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar user={user} onLogout={logout} />
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/flashcards" element={<FlashcardPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/exams" element={<ExamPage />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/transactions" element={<TransactionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
