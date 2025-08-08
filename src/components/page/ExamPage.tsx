import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Clock,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Target,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export function ExamPage() {
  const [examMode, setExamMode] = useState("browse"); // browse, active, review, results
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0 && !examSubmitted) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setExamSubmitted(true);
            setExamMode("results");
            toast.error("Time's up! Exam submitted automatically.");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, examSubmitted]);

  const availableExams = [
    {
      id: "js-cert",
      title: "JavaScript Certification",
      description:
        "Comprehensive test covering ES6+, DOM manipulation, and async programming",
      duration: "2 hours",
      questions: 50,
      passingScore: 80,
      difficulty: "Advanced",
      attempts: 2,
      maxAttempts: 3,
      lastAttempt: "2 weeks ago",
      bestScore: 85,
      category: "Programming",
      icon: "⚡",
    },
    {
      id: "react-expert",
      title: "React Expert Assessment",
      description:
        "Advanced React concepts including hooks, context, and performance optimization",
      duration: "2.5 hours",
      questions: 60,
      passingScore: 75,
      difficulty: "Expert",
      attempts: 0,
      maxAttempts: 2,
      lastAttempt: "Never",
      bestScore: null,
      category: "Framework",
      icon: "⚛️",
    },
    {
      id: "algorithms",
      title: "Data Structures & Algorithms",
      description:
        "Problem-solving with arrays, trees, graphs, and dynamic programming",
      duration: "3 hours",
      questions: 40,
      passingScore: 70,
      difficulty: "Expert",
      attempts: 1,
      maxAttempts: 3,
      lastAttempt: "1 month ago",
      bestScore: 92,
      category: "Computer Science",
      icon: "🧮",
    },
    {
      id: "css-advanced",
      title: "Advanced CSS & Design",
      description:
        "Modern CSS including Grid, Flexbox, animations, and responsive design",
      duration: "1.5 hours",
      questions: 35,
      passingScore: 75,
      difficulty: "Intermediate",
      attempts: 3,
      maxAttempts: 3,
      lastAttempt: "3 days ago",
      bestScore: 78,
      category: "Design",
      icon: "🎨",
    },
  ];

  const sampleExamQuestions = [
    {
      id: 1,
      question:
        "Which of the following is NOT a primitive data type in JavaScript?",
      options: ["string", "boolean", "array", "number"],
      correctAnswer: 2,
      explanation:
        "Array is an object type, not a primitive. The primitive types are string, number, boolean, null, undefined, symbol, and bigint.",
    },
    {
      id: 2,
      question:
        'What does the "this" keyword refer to in a regular function call?',
      options: [
        "The function itself",
        "The global object",
        "undefined",
        "The calling object",
      ],
      correctAnswer: 1,
      explanation:
        'In a regular function call (not method call), "this" refers to the global object (window in browsers) in non-strict mode.',
    },
    {
      id: 3,
      question: "Which method is used to add elements to the end of an array?",
      options: ["unshift()", "push()", "concat()", "splice()"],
      correctAnswer: 1,
      explanation:
        "push() adds one or more elements to the end of an array and returns the new length of the array.",
    },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
      case "easy":
        return "bg-green-100 text-green-800";
      case "intermediate":
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-orange-100 text-orange-800";
      case "expert":
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const startExam = (exam: any) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(
      exam.duration === "2 hours"
        ? 7200
        : exam.duration === "2.5 hours"
        ? 9000
        : 5400
    );
    setIsTimerActive(true);
    setExamSubmitted(false);
    setExamMode("active");
    toast.success("Exam started! Good luck!");
  };

  const submitExam = () => {
    setIsTimerActive(false);
    setExamSubmitted(true);
    setExamMode("results");
    toast.success("Exam submitted successfully!");
  };

  const calculateScore = () => {
    const correctAnswers = Object.entries(answers).filter(
      ([index, answer]) =>
        sampleExamQuestions[parseInt(index)]?.correctAnswer === answer
    ).length;
    return Math.round((correctAnswers / sampleExamQuestions.length) * 100);
  };

  if (examMode === "results") {
    const score = calculateScore();
    const passed = score >= 80;

    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
              passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {passed ? (
              <CheckCircle2 className="w-10 h-10" />
            ) : (
              <XCircle className="w-10 h-10" />
            )}
          </div>
          <h1 className="text-3xl">Exam Complete!</h1>
          <p className="text-muted-foreground">
            {passed
              ? "Congratulations! You passed the exam."
              : "You did not meet the passing score this time."}
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Your Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-5xl mb-2 ${
                    passed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {score}%
                </div>
                <p className="text-muted-foreground">
                  {Object.keys(answers).length} out of{" "}
                  {sampleExamQuestions.length} questions answered
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Passing score: {selectedExam?.passingScore}%
                </p>
              </div>
              <Progress value={score} className="h-3" />
              {passed && (
                <Alert>
                  <Award className="h-4 w-4" />
                  <AlertDescription>
                    🎉 You've earned a certification! This will be added to your
                    profile.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl">{score}%</div>
                <p className="text-sm text-muted-foreground">Final Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl">
                  {formatTime(7200 - timeRemaining)}
                </div>
                <p className="text-sm text-muted-foreground">Time Used</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl">+{passed ? 500 : 250}</div>
                <p className="text-sm text-muted-foreground">XP Gained</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => setExamMode("review")}>
              Review Answers
            </Button>
            <Button variant="outline" onClick={() => setExamMode("browse")}>
              Back to Exams
            </Button>
            {!passed && selectedExam?.attempts < selectedExam?.maxAttempts && (
              <Button onClick={() => startExam(selectedExam)}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Exam
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (examMode === "active") {
    const currentQuestion = sampleExamQuestions[currentQuestionIndex];
    const progress =
      ((currentQuestionIndex + 1) / sampleExamQuestions.length) * 100;

    return (
      <div className="p-6 space-y-6">
        {/* Header with Timer */}
        <div className="flex items-center justify-between bg-card border rounded-lg p-4">
          <div>
            <h1 className="text-xl">{selectedExam?.title}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of{" "}
              {sampleExamQuestions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                timeRemaining < 600
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              <Timer className="w-4 h-4" />
              <span className="text-sm">{formatTime(timeRemaining)}</span>
            </div>
            <Progress value={progress} className="w-32 h-2" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTimerActive(!isTimerActive)}
            >
              {isTimerActive ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {timeRemaining < 600 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Warning: Only {Math.floor(timeRemaining / 60)} minutes remaining!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question */}
          <div className="lg:col-span-3">
            <Card className="min-h-96">
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[currentQuestionIndex]?.toString()}
                  onValueChange={(value) =>
                    setAnswers({
                      ...answers,
                      [currentQuestionIndex]: parseInt(value),
                    })
                  }
                >
                  {currentQuestion.options.map((option, index) => (
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

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentQuestionIndex(
                        Math.max(0, currentQuestionIndex - 1)
                      )
                    }
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    {currentQuestionIndex === sampleExamQuestions.length - 1 ? (
                      <Button
                        onClick={submitExam}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Submit Exam
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          setCurrentQuestionIndex(
                            Math.min(
                              sampleExamQuestions.length - 1,
                              currentQuestionIndex + 1
                            )
                          )
                        }
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Navigator */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Answered</span>
                  <span>
                    {Object.keys(answers).length}/{sampleExamQuestions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span>
                    {sampleExamQuestions.length - Object.keys(answers).length}
                  </span>
                </div>
                <Progress
                  value={
                    (Object.keys(answers).length / sampleExamQuestions.length) *
                    100
                  }
                  className="h-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {sampleExamQuestions.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        index === currentQuestionIndex ? "default" : "outline"
                      }
                      size="sm"
                      className={`w-8 h-8 p-0 ${
                        answers[index] !== undefined
                          ? "bg-green-100 border-green-300"
                          : index < currentQuestionIndex
                          ? "bg-yellow-100 border-yellow-300"
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

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Make sure to answer all questions before submitting. You can
                navigate between questions freely.
              </AlertDescription>
            </Alert>
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
          <h1 className="text-3xl">Certification Exams</h1>
          <p className="text-muted-foreground">
            Test your skills with comprehensive assessments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Exam
          </Button>
        </div>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList>
          <TabsTrigger value="available">Available Exams</TabsTrigger>
          <TabsTrigger value="history">Exam History</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {availableExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{exam.icon}</div>
                      <div>
                        <CardTitle className="text-xl">{exam.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {exam.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(exam.difficulty)}>
                      {exam.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>{exam.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span>{exam.passingScore}% to pass</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {exam.attempts}/{exam.maxAttempts} attempts
                      </span>
                    </div>
                  </div>

                  {exam.bestScore && (
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Best Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{exam.bestScore}%</span>
                        {exam.bestScore >= exam.passingScore && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => startExam(exam)}
                      disabled={exam.attempts >= exam.maxAttempts}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {exam.attempts === 0 ? "Take Exam" : "Retake Exam"}
                    </Button>
                    <Button variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Study Guide
                    </Button>
                  </div>

                  {exam.attempts >= exam.maxAttempts && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        You have reached the maximum number of attempts for this
                        exam.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exam Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    exam: "JavaScript Certification",
                    date: "2 weeks ago",
                    score: 85,
                    status: "Passed",
                  },
                  {
                    exam: "CSS Advanced",
                    date: "3 days ago",
                    score: 78,
                    status: "Passed",
                  },
                  {
                    exam: "React Expert Assessment",
                    date: "1 month ago",
                    score: 65,
                    status: "Failed",
                  },
                  {
                    exam: "Data Structures",
                    date: "1 month ago",
                    score: 92,
                    status: "Passed",
                  },
                ].map((attempt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="text-sm">{attempt.exam}</h4>
                      <p className="text-xs text-muted-foreground">
                        {attempt.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{attempt.score}%</span>
                        <Badge
                          variant={
                            attempt.status === "Passed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {attempt.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "JavaScript Expert", date: "Dec 2024", score: 85 },
              { title: "CSS Advanced", date: "Nov 2024", score: 78 },
              { title: "Algorithm Master", date: "Oct 2024", score: 92 },
            ].map((cert, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Award className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-lg mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Earned {cert.date}
                  </p>
                  <Badge variant="secondary">Score: {cert.score}%</Badge>
                  <Button variant="outline" className="w-full mt-4">
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
