"use client";
import React, { useState, useEffect } from "react";
import { LandingPage } from "@/components/page/LandingPage";
import { AuthPage } from "@/components/page/AuthPage";
import { DashboardUser } from "@/components/page/DashboardUser";
import { FlashcardPage } from "@/components/page/FlashcardPage";
import { PracticePage } from "@/components/page/PracticePage";
import { ExamPage } from "@/components/page/ExamPage";
import { AnalyticsPage } from "@/components/page/AnalyticsPage";
import { ProfilePage } from "@/components/page/ProfilePage";
import { TransactionPage } from "@/components/page/TransactionPage";
import { SimulationPage } from "@/components/page/SimulationPage";
import { CoursePage } from "@/components/page/CoursePage";
import { SettingsPage } from "@/components/page/SettingsPage";
import { LeaderboardPage } from "@/components/page/LeaderboardPage";
import { CreditsPage } from "@/components/page/CreditsPage";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToogle";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

function App() {
  return (
    <>
      <LandingPage />
      <Toaster />
    </>
  );
}

export default App;
