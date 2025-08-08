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
  RotateCcw,
  Plus,
  Search,
  Filter,
  BookOpen,
  Brain,
  Target,
  Clock,
  Star,
  Shuffle,
  Play,
  SkipForward,
  ThumbsUp,
  ThumbsDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

export function FlashcardPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState("review"); // review, create, manage
  const [selectedDeck, setSelectedDeck] = useState("javascript");
  const [searchTerm, setSearchTerm] = useState("");
  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const flashcardDecks = [
    {
      id: "javascript",
      name: "JavaScript Fundamentals",
      cards: 45,
      mastered: 32,
      category: "Programming",
      color: "bg-yellow-500",
      difficulty: "Intermediate",
    },
    {
      id: "react",
      name: "React Concepts",
      cards: 38,
      mastered: 18,
      category: "Framework",
      color: "bg-blue-500",
      difficulty: "Advanced",
    },
    {
      id: "css",
      name: "CSS Styling",
      cards: 52,
      mastered: 40,
      category: "Design",
      color: "bg-pink-500",
      difficulty: "Beginner",
    },
    {
      id: "algorithms",
      name: "Data Structures",
      cards: 67,
      mastered: 15,
      category: "Computer Science",
      color: "bg-green-500",
      difficulty: "Advanced",
    },
  ];

  const sampleCards = [
    {
      id: 1,
      question:
        "What is the difference between let, const, and var in JavaScript?",
      answer:
        "var is function-scoped and can be redeclared. let is block-scoped and can be reassigned but not redeclared. const is block-scoped and cannot be reassigned or redeclared.",
      category: "Variables",
      difficulty: "Medium",
      lastReviewed: "2 days ago",
      confidence: 3,
    },
    {
      id: 2,
      question: "Explain event bubbling in JavaScript",
      answer:
        "Event bubbling is when an event triggered on a child element propagates up through its parent elements in the DOM tree, triggering the same event type on each parent.",
      category: "Events",
      difficulty: "Hard",
      lastReviewed: "1 week ago",
      confidence: 2,
    },
    {
      id: 3,
      question: "What is a closure in JavaScript?",
      answer:
        "A closure is a function that has access to variables in its outer (lexical) scope even after the outer function has finished executing.",
      category: "Functions",
      difficulty: "Hard",
      lastReviewed: "3 days ago",
      confidence: 4,
    },
  ];

  const currentCard = sampleCards[currentCardIndex];

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % sampleCards.length);
    setShowAnswer(false);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex(
      (prev) => (prev - 1 + sampleCards.length) % sampleCards.length
    );
    setShowAnswer(false);
  };

  const handleConfidence = (level: number) => {
    toast.success(
      `Marked as ${level === 5 ? "Easy" : level === 3 ? "Good" : "Hard"}`
    );
    handleNextCard();
  };

  const handleCreateCard = () => {
    if (newCard.question && newCard.answer) {
      toast.success("Flashcard created successfully!");
      setNewCard({ question: "", answer: "", category: "" });
    } else {
      toast.error("Please fill in both question and answer");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
      case "beginner":
        return "bg-green-100 text-green-800";
      case "medium":
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
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
          <h1 className="text-3xl">Flashcards</h1>
          <p className="text-muted-foreground">
            Master concepts with spaced repetition
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Deck
          </Button>
        </div>
      </div>

      <Tabs value={studyMode} onValueChange={setStudyMode} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="review">Study</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="manage">Manage Decks</TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          {/* Deck Selection */}
          <div className="flex items-center gap-4">
            <Select value={selectedDeck} onValueChange={setSelectedDeck}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a deck" />
              </SelectTrigger>
              <SelectContent>
                {flashcardDecks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${deck.color}`} />
                      {deck.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Progress:</span>
              <Progress value={65} className="w-32 h-2" />
              <span>65%</span>
            </div>
          </div>

          {/* Study Interface */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Card */}
            <div className="lg:col-span-2">
              <Card className="min-h-96">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{currentCard.category}</Badge>
                      <Badge
                        className={getDifficultyColor(currentCard.difficulty)}
                      >
                        {currentCard.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {currentCardIndex + 1} of {sampleCards.length}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      {!showAnswer ? (
                        <>
                          <h2 className="text-xl mb-4">Question</h2>
                          <p className="text-lg leading-relaxed">
                            {currentCard.question}
                          </p>
                        </>
                      ) : (
                        <>
                          <h2 className="text-xl mb-4">Answer</h2>
                          <p className="text-lg leading-relaxed">
                            {currentCard.answer}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="border-t p-4">
                    {!showAnswer ? (
                      <Button
                        onClick={() => setShowAnswer(true)}
                        className="w-full"
                        size="lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Show Answer
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleConfidence(1)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <ThumbsDown className="w-4 h-4 mr-2" />
                            Hard
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleConfidence(3)}
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            Good
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleConfidence(5)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Easy
                          </Button>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="ghost" onClick={handlePreviousCard}>
                            Previous
                          </Button>
                          <Button onClick={handleNextCard}>
                            <SkipForward className="w-4 h-4 mr-2" />
                            Next Card
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Study Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Study Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Cards Reviewed
                    </span>
                    <span>12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Time Elapsed
                    </span>
                    <span>15:30</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Accuracy
                    </span>
                    <span>85%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">
                      Confidence: {currentCard.confidence}/5
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">
                      Last reviewed: {currentCard.lastReviewed}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Due for review: Today</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Study Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Be honest with your confidence ratings</p>
                    <p>• Review daily for best retention</p>
                    <p>• Focus on understanding, not memorizing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Flashcard</CardTitle>
              <CardDescription>
                Add a new card to your collection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Question</label>
                <textarea
                  className="w-full min-h-24 p-3 border rounded-lg resize-none"
                  placeholder="Enter your question here..."
                  value={newCard.question}
                  onChange={(e) =>
                    setNewCard({ ...newCard, question: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Answer</label>
                <textarea
                  className="w-full min-h-32 p-3 border rounded-lg resize-none"
                  placeholder="Enter the answer here..."
                  value={newCard.answer}
                  onChange={(e) =>
                    setNewCard({ ...newCard, answer: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Category</label>
                  <Input
                    placeholder="e.g., Variables, Functions"
                    value={newCard.category}
                    onChange={(e) =>
                      setNewCard({ ...newCard, category: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Deck</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deck" />
                    </SelectTrigger>
                    <SelectContent>
                      {flashcardDecks.map((deck) => (
                        <SelectItem key={deck.id} value={deck.id}>
                          {deck.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateCard}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Card
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setNewCard({ question: "", answer: "", category: "" })
                  }
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search decks..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Deck Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flashcardDecks.map((deck) => (
              <Card key={deck.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${deck.color}`} />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{deck.name}</CardTitle>
                      <CardDescription>{deck.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {deck.mastered}/{deck.cards} cards
                    </span>
                  </div>
                  <Progress
                    value={(deck.mastered / deck.cards) * 100}
                    className="h-2"
                  />
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(deck.difficulty)}>
                      {deck.difficulty}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Study
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
