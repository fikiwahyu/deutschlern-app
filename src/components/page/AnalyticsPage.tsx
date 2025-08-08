import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  BookOpen,
  Brain,
  Award,
  Calendar,
  Users,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Study Streak",
      value: "12",
      unit: "days",
      change: "+2",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Hours Studied",
      value: "24.5",
      unit: "hrs",
      change: "+3.2",
      trend: "up",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Avg Score",
      value: "87",
      unit: "%",
      change: "-2",
      trend: "down",
      icon: Target,
      color: "text-orange-500",
    },
    {
      title: "Cards Mastered",
      value: "234",
      unit: "cards",
      change: "+18",
      trend: "up",
      icon: BookOpen,
      color: "text-purple-500",
    },
  ];

  const subjects = [
    { name: "JavaScript", progress: 85, timeSpent: "12.5h", accuracy: 92 },
    { name: "React", progress: 78, timeSpent: "8.2h", accuracy: 87 },
    { name: "CSS", progress: 95, timeSpent: "4.1h", accuracy: 94 },
    { name: "Algorithms", progress: 45, timeSpent: "6.8h", accuracy: 76 },
  ];

  const recentActivity = [
    {
      type: "flashcard",
      subject: "JavaScript",
      score: 95,
      time: "2 hours ago",
    },
    {
      type: "practice",
      subject: "React Hooks",
      score: 87,
      time: "5 hours ago",
    },
    { type: "exam", subject: "CSS Fundamentals", score: 92, time: "1 day ago" },
    { type: "simulation", subject: "Debugging", score: 88, time: "2 days ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Learning Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress and identify areas for improvement
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.unit}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs mt-1 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{stat.change} from last week</span>
                  </div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Study Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
              <CardDescription>
                Your learning progress across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                            ? "bg-blue-500"
                            : index === 2
                            ? "bg-pink-500"
                            : "bg-green-500"
                        }`}
                      />
                      {subject.name}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{subject.timeSpent}</span>
                      <span>{subject.accuracy}% accuracy</span>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {subject.progress}% complete
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Pattern</CardTitle>
              <CardDescription>
                Your study hours throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 h-48">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const height = [60, 80, 45, 90, 75, 30, 20][index];
                    return (
                      <div
                        key={day}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="flex-1 flex items-end">
                          <div
                            className="w-8 bg-primary/20 rounded-t"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {day}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 border rounded-lg"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      activity.type === "flashcard"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "practice"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "exam"
                        ? "bg-red-100 text-red-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {activity.type === "flashcard"
                      ? "📚"
                      : activity.type === "practice"
                      ? "🎯"
                      : activity.type === "exam"
                      ? "📝"
                      : "🧠"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{activity.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.score}%
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Study 30 mins daily</span>
                  <span className="text-green-600">12/12</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Complete 50 flashcards</span>
                  <span>38/50</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Pass 3 practice exams</span>
                  <span>2/3</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  title: "Week Warrior",
                  desc: "Study 7 days straight",
                  earned: true,
                },
                {
                  title: "Flash Master",
                  desc: "100 flashcards in a day",
                  earned: true,
                },
                {
                  title: "Perfect Score",
                  desc: "Get 100% on an exam",
                  earned: false,
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    achievement.earned ? "bg-muted/50" : "opacity-50"
                  }`}
                >
                  <Award
                    className={`w-6 h-6 ${
                      achievement.earned
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.desc}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
