"use client";

import React from "react";
// import { Link, useLocation } from "react-router-dom";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  LayoutDashboard,
  CreditCard,
  BookOpen,
  Target,
  FileText,
  Brain,
  TrendingUp,
  User,
  Settings,
  LogOut,
  PlayCircle,
  Trophy,
  Award,
  Clock,
  Heart,
  Info,
} from "lucide-react";
import exampleImage from "figma:asset/93a943ae833a24da8595ccc251ab9d29bb5ecea6.png";
import { ModeToggle } from "@/components/ModeToogle";

interface SidebarProps {
  user: any;
}

const navigationItems = [
  {
    title: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: TrendingUp, label: "Analytics", href: "/analytics" },
      { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    ],
  },
  {
    title: "Learning",
    items: [
      { icon: BookOpen, label: "Flashcards", href: "/flashcards" },
      { icon: Target, label: "Practice", href: "/practice" },
      { icon: FileText, label: "Exams", href: "/exams" },
      { icon: Brain, label: "Simulation", href: "/simulation" },
      { icon: PlayCircle, label: "Courses", href: "/courses" },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile", href: "/profile" },
      { icon: CreditCard, label: "Billing", href: "/transactions" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
];

const onLogout = () => {
  // Handle logout logic here, e.g., clear session, redirect to login page, etc.
  redirect("/login");
};

export function Sidebar({ user }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b">
          <img
            src={"https://api.dicebear.com/7.x/avataaars/svg?seed=social"}
            alt="CoverBook"
            className="w-8 h-8"
          />
          <span className="text-xl">CoverBook</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            Pro
          </Badge>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationItems.map((section, index) => (
            <div key={index}>
              <h3 className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = "/leaderboard" === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          isActive && "bg-secondary"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Study Stats */}
        <div className="p-4 border-t">
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Study Streak</span>
              <div className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-yellow-500" />
                <span>12 days</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Today</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-blue-500" />
                <span>2h 15m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t space-y-2">
          {/* Credits Link */}
          <Link href="/credits">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Heart className="h-4 w-4" />
              Credits
            </Button>
          </Link>
          <ModeToggle />

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
