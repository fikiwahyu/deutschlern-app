import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Settings,
  Camera,
  Trophy,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  user: any;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Passionate learner focused on web development and computer science.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    joinDate: "January 2024",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const stats = [
    { label: "Study Streak", value: "12", unit: "days", icon: TrendingUp },
    { label: "Courses Completed", value: "8", unit: "courses", icon: BookOpen },
    { label: "Total XP", value: "2,450", unit: "points", icon: Star },
    { label: "Average Score", value: "87", unit: "%", icon: Target },
  ];

  const achievements = [
    {
      id: 1,
      title: "JavaScript Master",
      description: "Completed advanced JavaScript course with 95% score",
      icon: "🏆",
      date: "Dec 2024",
      rarity: "Gold",
    },
    {
      id: 2,
      title: "Study Streak Champion",
      description: "Maintained a 30-day study streak",
      icon: "🔥",
      date: "Nov 2024",
      rarity: "Silver",
    },
    {
      id: 3,
      title: "Practice Pro",
      description: "Completed 500 practice questions",
      icon: "🎯",
      date: "Oct 2024",
      rarity: "Bronze",
    },
  ];

  const courses = [
    {
      title: "JavaScript Fundamentals",
      progress: 100,
      score: 95,
      status: "Completed",
      date: "Dec 2024",
    },
    {
      title: "React Development",
      progress: 75,
      score: 87,
      status: "In Progress",
      date: "Current",
    },
    {
      title: "Data Structures",
      progress: 45,
      score: 82,
      status: "In Progress",
      date: "Current",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "silver":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "bronze":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-xl">
                {user?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl">{profileData.name}</h1>
            <p className="text-muted-foreground">{profileData.bio}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {profileData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      action: "Completed JavaScript Arrays quiz",
                      score: "95%",
                      time: "2 hours ago",
                    },
                    {
                      action: "Studied React Hooks flashcards",
                      score: "23 cards",
                      time: "5 hours ago",
                    },
                    {
                      action: "Passed CSS Fundamentals exam",
                      score: "87%",
                      time: "1 day ago",
                    },
                    {
                      action: "Started Data Structures course",
                      score: "New",
                      time: "2 days ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      <Badge variant="secondary">{activity.score}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Streak</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-4xl">🔥</div>
                  <div className="text-3xl">12</div>
                  <p className="text-muted-foreground">Days in a row</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal: 30 days</span>
                      <span>12/30</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "JavaScript", level: 85 },
                    { skill: "React", level: 72 },
                    { skill: "CSS", level: 90 },
                    { skill: "Algorithms", level: 45 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span>{item.level}%</span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="space-y-4">
            {courses.map((course, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          course.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {course.status}
                      </Badge>
                      {course.score && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Score: {course.score}%
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        website: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
