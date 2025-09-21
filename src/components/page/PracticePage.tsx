"use client";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  Target,
  BookOpen,
  Brain,
  RotateCcw,
  Filter,
  TrendingUp,
  Award,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

export function PracticePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: any;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [practiceMode, setPracticeMode] = useState("browse"); // browse, active, results
  const [selectedCategory, setSelectedCategory] = useState("all");

  const practiceCategories = [
    {
      id: "javascript",
      name: "JavaScript",
      icon: "⚡",
      questions: 125,
      completed: 89,
      difficulty: "Mixed",
      timeEstimate: "45 min",
    },
    {
      id: "react",
      name: "React",
      icon: "⚛️",
      questions: 78,
      completed: 45,
      difficulty: "Advanced",
      timeEstimate: "60 min",
    },
    {
      id: "algorithms",
      name: "Algorithms",
      icon: "🧮",
      questions: 156,
      completed: 23,
      difficulty: "Hard",
      timeEstimate: "90 min",
    },
    {
      id: "css",
      name: "CSS & Design",
      icon: "🎨",
      questions: 67,
      completed: 56,
      difficulty: "Beginner",
      timeEstimate: "30 min",
    },
  ];

  const sampleQuestions = [
    {
      id: 1,
      type: "multiple-choice",
      category: "JavaScript",
      difficulty: "Medium",
      question:
        "What will the following code output?\n\nconsole.log(typeof null);",
      options: ["null", "undefined", "object", "boolean"],
      correctAnswer: 2,
      explanation:
        "In JavaScript, null is considered an object due to a bug in the original implementation that has been preserved for compatibility.",
    },
    {
      id: 2,
      type: "multiple-select",
      category: "React",
      difficulty: "Hard",
      question:
        "Which of the following are valid React hooks? (Select all that apply)",
      options: [
        "useState",
        "useContext",
        "useClass",
        "useEffect",
        "useComponent",
      ],
      correctAnswers: [0, 1, 3],
      explanation:
        "useState, useContext, and useEffect are built-in React hooks. useClass and useComponent are not valid hooks.",
    },
    {
      id: 3,
      type: "code-completion",
      category: "JavaScript",
      difficulty: "Medium",
      question: "Complete the function to reverse a string:",
      code: "function reverseString(str) {\n  // Your code here\n  return ___;\n}",
      correctAnswer: 'str.split("").reverse().join("")',
      explanation:
        "This splits the string into an array, reverses it, and joins it back into a string.",
    },
    {
      id: 4,
      type: "true-false",
      category: "CSS",
      difficulty: "Easy",
      question:
        "CSS Grid can be used to create both rows and columns simultaneously.",
      correctAnswer: true,
      explanation:
        "CSS Grid is a two-dimensional layout system that can handle both rows and columns at the same time.",
    },
  ];

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: any) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      setPracticeMode("results");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((q, index) => {
      const userAnswer = selectedAnswers[index];
      if (q.type === "multiple-choice" || q.type === "true-false") {
        if (userAnswer === q.correctAnswer) correct++;
      } else if (q.type === "multiple-select") {
        if (
          JSON.stringify(userAnswer?.sort()) ===
          JSON.stringify(q.correctAnswers?.sort())
        ) {
          correct++;
        }
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const renderQuestion = () => {
    const question = currentQuestion;
    const userAnswer = selectedAnswers[currentQuestionIndex];

    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={userAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {question.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50"
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multiple-select":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50"
              >
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={userAnswer?.includes(index) || false}
                  onCheckedChange={(checked) => {
                    const currentAnswers = userAnswer || [];
                    if (checked) {
                      handleAnswerSelect([...currentAnswers, index]);
                    } else {
                      handleAnswerSelect(
                        currentAnswers.filter((a: number) => a !== index)
                      );
                    }
                  }}
                />
                <Label
                  htmlFor={`checkbox-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case "code-completion":
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">{question.code}</pre>
            </div>
            <Textarea
              placeholder="Enter your code here..."
              value={userAnswer || ""}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              className="min-h-24"
            />
          </div>
        );

      case "true-false":
        return (
          <RadioGroup
            value={userAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(value === "true")}
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true" className="flex-1 cursor-pointer">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false" className="flex-1 cursor-pointer">
                False
              </Label>
            </div>
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
      case "beginner":
        return "bg-green-100 text-green-800";
      case "medium":
      case "mixed":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (practiceMode === "results") {
    const score = calculateScore();
    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl">Practice Complete!</h1>
          <p className="text-muted-foreground">Here's how you performed</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Your Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-5xl text-primary">{score}%</div>
              <Progress value={score} className="h-3" />
              <p className="text-muted-foreground">
                You got {Math.round((score * sampleQuestions.length) / 100)} out
                of {sampleQuestions.length} questions correct
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl">85%</div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl">12:30</div>
                <p className="text-sm text-muted-foreground">Time Taken</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl">+150</div>
                <p className="text-sm text-muted-foreground">XP Earned</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setPracticeMode("browse");
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
                setShowResults(false);
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Practice Again
            </Button>
            <Button variant="outline">Review Answers</Button>
          </div>
        </div>
      </div>
    );
  }

  if (practiceMode === "active") {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">Practice Session</h1>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {sampleQuestions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">15:30</span>
            </div>
            <Progress
              value={
                ((currentQuestionIndex + 1) / sampleQuestions.length) * 100
              }
              className="w-32 h-2"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question */}
          <div className="lg:col-span-2">
            <Card className="min-h-96">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{currentQuestion.category}</Badge>
                  <Badge
                    className={getDifficultyColor(currentQuestion.difficulty)}
                  >
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderQuestion()}

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestionIndex]}
                  >
                    {currentQuestionIndex === sampleQuestions.length - 1
                      ? "Finish"
                      : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span>
                    {currentQuestionIndex + 1}/{sampleQuestions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Answered</span>
                  <span>{Object.keys(selectedAnswers).length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time Elapsed</span>
                  <span>15:30</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {sampleQuestions.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        index === currentQuestionIndex ? "default" : "outline"
                      }
                      size="sm"
                      className={`w-8 h-8 p-0 ${
                        selectedAnswers[index] !== undefined
                          ? "bg-green-100 border-green-300"
                          : ""
                      }`}
                      onClick={() => setCurrentQuestionIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Hint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Take your time to read each option carefully. Consider what
                  you know about the topic and eliminate obviously wrong answers
                  first.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Practice</h1>
          <p className="text-muted-foreground">
            Test your knowledge with interactive exercises
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Quick Practice
          </Button>
        </div>
      </div>

      {/* Practice Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {practiceCategories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{category.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>
                    {category.questions} questions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>
                  {category.completed}/{category.questions}
                </span>
              </div>
              <Progress
                value={(category.completed / category.questions) * 100}
                className="h-2"
              />
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(category.difficulty)}>
                  {category.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {category.timeEstimate}
                </span>
              </div>
              <Button
                className="w-full"
                onClick={() => setPracticeMode("active")}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Practice Sessions</CardTitle>
          <CardDescription>Your latest practice attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                subject: "JavaScript Arrays",
                date: "2 hours ago",
                score: 92,
                questions: 15,
              },
              {
                subject: "React Hooks",
                date: "1 day ago",
                score: 78,
                questions: 20,
              },
              {
                subject: "CSS Flexbox",
                date: "2 days ago",
                score: 95,
                questions: 12,
              },
              {
                subject: "Node.js Basics",
                date: "3 days ago",
                score: 83,
                questions: 18,
              },
            ].map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm">{session.subject}</h4>
                    <p className="text-xs text-muted-foreground">
                      {session.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{session.score}%</div>
                  <div className="text-xs text-muted-foreground">
                    {session.questions} questions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
