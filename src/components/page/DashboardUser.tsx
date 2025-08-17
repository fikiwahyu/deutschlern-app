import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Award,
  Users,
  PlayCircle,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Flame,
  Star,
} from "lucide-react";

interface DashboardProps {
  user: any;
}

export function DashboardUser({ user }: DashboardProps) {
  const stats = [
    {
      title: "Study Streak",
      value: "12",
      unit: "days",
      icon: Flame,
      description: "Keep it up!",
      color: "text-orange-500",
    },
    {
      title: "Flashcards Reviewed",
      value: "247",
      unit: "cards",
      icon: BookOpen,
      description: "+15 today",
      color: "text-blue-500",
    },
    {
      title: "Practice Score",
      value: "89",
      unit: "%",
      icon: Target,
      description: "+5% this week",
      color: "text-green-500",
    },
    {
      title: "Study Time",
      value: "24",
      unit: "hrs",
      icon: Clock,
      description: "This month",
      color: "text-purple-500",
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      progress: 75,
      nextLesson: "Arrow Functions",
      dueDate: "2 days",
      status: "in-progress",
    },
    {
      id: 2,
      title: "React Development",
      progress: 45,
      nextLesson: "State Management",
      dueDate: "5 days",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Data Structures",
      progress: 100,
      nextLesson: "Course Complete",
      dueDate: "Completed",
      status: "completed",
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      title: "React Certification",
      date: "Jan 28, 2025",
      time: "2:00 PM",
      duration: "2 hours",
      status: "scheduled",
    },
    {
      id: 2,
      title: "JavaScript Assessment",
      date: "Feb 05, 2025",
      time: "10:00 AM",
      duration: "1.5 hours",
      status: "scheduled",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Study Streak Master",
      description: "Maintained a 10-day study streak",
      icon: "🔥",
      earned: true,
    },
    {
      id: 2,
      title: "Quiz Champion",
      description: "Scored 100% on 5 consecutive quizzes",
      icon: "🏆",
      earned: true,
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Study before 8 AM for 7 days",
      icon: "🌅",
      earned: false,
    },
  ];

  const studyPlan = [
    {
      time: "9:00 AM",
      activity: "JavaScript Flashcards",
      duration: "30 min",
      completed: true,
    },
    {
      time: "2:00 PM",
      activity: "React Practice Quiz",
      duration: "45 min",
      completed: true,
    },
    {
      time: "7:00 PM",
      activity: "Algorithm Problems",
      duration: "60 min",
      completed: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            Welcome back, {user?.name?.split(" ")[0] || "Student"}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Let's continue your learning journey
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <PlayCircle className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Study
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Continue Learning</CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{course.title}</h4>
                      {course.status === "completed" && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Next: {course.nextLesson}
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={course.progress}
                        className="flex-1 h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {course.dueDate}
                    </p>
                    <Button size="sm" className="mt-2">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Study Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Study Plan</CardTitle>
              <CardDescription>
                Your scheduled learning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyPlan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.completed ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={
                            item.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }
                        >
                          {item.activity}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.duration}
                      </p>
                    </div>
                    {item.completed && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="p-3 border rounded-lg">
                  <h4 className="mb-1">{exam.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exam.date} at {exam.time}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {exam.duration}
                  </p>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    Prepare
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 border rounded-lg ${
                    achievement.earned ? "bg-muted/50" : "opacity-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Review Flashcards
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Take Practice Quiz
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
