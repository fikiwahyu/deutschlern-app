import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Award,
  TrendingUp,
} from "lucide-react";

export function CoursePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      lessons: 24,
      students: 12543,
      rating: 4.8,
      price: 0,
      category: "Programming",
      level: "Beginner",
      progress: 100,
      enrolled: true,
      completed: true,
      thumbnail: "💻",
    },
    {
      id: 2,
      title: "React Development Mastery",
      description: "Build modern web applications with React and its ecosystem",
      instructor: "Mike Chen",
      duration: "12 hours",
      lessons: 36,
      students: 8754,
      rating: 4.9,
      price: 49,
      category: "Framework",
      level: "Intermediate",
      progress: 65,
      enrolled: true,
      completed: false,
      thumbnail: "⚛️",
    },
    {
      id: 3,
      title: "Advanced CSS & Design",
      description: "Create beautiful and responsive designs with CSS",
      instructor: "Emma Davis",
      duration: "6 hours",
      lessons: 18,
      students: 6234,
      rating: 4.7,
      price: 29,
      category: "Design",
      level: "Intermediate",
      progress: 0,
      enrolled: false,
      completed: false,
      thumbnail: "🎨",
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      description: "Master computer science fundamentals for coding interviews",
      instructor: "Alex Rodriguez",
      duration: "15 hours",
      lessons: 42,
      students: 4567,
      rating: 4.6,
      price: 79,
      category: "Computer Science",
      level: "Advanced",
      progress: 25,
      enrolled: true,
      completed: false,
      thumbnail: "🧮",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "programming", label: "Programming" },
    { value: "framework", label: "Frameworks" },
    { value: "design", label: "Design" },
    { value: "computer-science", label: "Computer Science" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      course.category.toLowerCase() === selectedCategory.replace("-", " ");
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Courses</h1>
          <p className="text-muted-foreground">
            Expand your knowledge with our comprehensive courses
          </p>
        </div>
        <Button>
          <Award className="w-4 h-4 mr-2" />
          Browse Certificates
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-4xl">
                    {course.thumbnail}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg line-clamp-2">{course.title}</h3>
                        {course.enrolled && course.completed && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        by {course.instructor}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{course.rating}</span>
                        </div>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                      <div className="text-right">
                        {course.price === 0 ? (
                          <span className="text-sm text-green-600">Free</span>
                        ) : (
                          <span className="text-sm">${course.price}</span>
                        )}
                      </div>
                    </div>

                    {course.enrolled && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <Button className="w-full">
                      {course.enrolled ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          {course.progress === 0 ? "Start Course" : "Continue"}
                        </>
                      ) : (
                        "Enroll Now"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.enrolled)
              .map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{course.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {course.instructor}
                        </p>
                      </div>
                      {course.completed && (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      {course.progress === 0 ? "Start Course" : "Continue"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.completed)
              .map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{course.thumbnail}</div>
                      <div className="flex-1">
                        <h3 className="text-lg">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Completed
                        </p>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" variant="outline">
                        <Award className="w-4 h-4 mr-2" />
                        Certificate
                      </Button>
                      <Button className="flex-1" variant="outline">
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-4">
          <Card>
            <CardContent className="p-12 text-center space-y-4">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
              <h3 className="text-xl">No courses in wishlist</h3>
              <p className="text-muted-foreground">
                Browse our course catalog and add courses to your wishlist for
                later
              </p>
              <Button>Browse Courses</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
