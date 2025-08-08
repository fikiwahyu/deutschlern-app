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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { SimulationCard } from "../simulation/SimulationCard";
import { StepRenderer } from "../simulation/StepRenderer";
import { SimulationResults } from "../simulation/SimulationResults";
import { SIMULATIONS, SAMPLE_SIMULATION_STEPS } from "../simulation/constants";
import { Trophy } from "lucide-react";
import { toast } from "sonner";

export function SimulationPage() {
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationMode, setSimulationMode] = useState("browse"); // browse, active, results
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);

  const currentStep = SAMPLE_SIMULATION_STEPS[simulationStep];

  const startSimulation = (simulation: any) => {
    setActiveSimulation(simulation);
    setSimulationStep(0);
    setSimulationMode("active");
    setScore(0);
    setUserInput("");
    toast.success("Simulation started!");
  };

  const handleAnswer = (answer: any) => {
    if (currentStep.type === "question") {
      if (answer === currentStep.correctAnswer) {
        setScore(score + 20);
        toast.success("Correct!");
      } else {
        toast.error("Not quite right. Try again!");
        return;
      }
    }

    if (simulationStep < SAMPLE_SIMULATION_STEPS.length - 1) {
      setSimulationStep(simulationStep + 1);
    } else {
      setSimulationMode("results");
    }
  };

  const handleCodeSubmit = () => {
    if (
      userInput.includes("[products]") ||
      userInput.includes(", [products]")
    ) {
      setScore(score + 30);
      toast.success("Correct solution!");
      if (simulationStep < SAMPLE_SIMULATION_STEPS.length - 1) {
        setSimulationStep(simulationStep + 1);
      } else {
        setSimulationMode("results");
      }
    } else {
      toast.error("That's not quite right. Check the hint!");
    }
  };

  if (simulationMode === "results") {
    return (
      <SimulationResults
        score={score}
        onBackToBrowse={() => setSimulationMode("browse")}
      />
    );
  }

  if (simulationMode === "active") {
    const progress =
      ((simulationStep + 1) / SAMPLE_SIMULATION_STEPS.length) * 100;

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-card border rounded-lg p-4">
          <div>
            <h1 className="text-xl">{activeSimulation?.title}</h1>
            <p className="text-sm text-muted-foreground">
              Step {simulationStep + 1} of {SAMPLE_SIMULATION_STEPS.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm">Score: {score}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <StepRenderer
              step={currentStep}
              simulationStep={simulationStep}
              userInput={userInput}
              setUserInput={setUserInput}
              onAnswer={handleAnswer}
              onCodeSubmit={handleCodeSubmit}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Step</span>
                  <span>
                    {simulationStep + 1}/{SAMPLE_SIMULATION_STEPS.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Score</span>
                  <span>{score} pts</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activeSimulation?.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
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
          <h1 className="text-3xl">Interactive Simulations</h1>
          <p className="text-muted-foreground">
            Learn through real-world scenarios and hands-on practice
          </p>
        </div>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList>
          <TabsTrigger value="available">Available Simulations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {SIMULATIONS.map((simulation) => (
              <SimulationCard
                key={simulation.id}
                simulation={simulation}
                onStart={() => startSimulation(simulation)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Simulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SIMULATIONS.filter((s) => s.completed).map((simulation) => (
                  <div
                    key={simulation.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{simulation.icon}</div>
                      <div>
                        <h4 className="text-sm">{simulation.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {simulation.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">95%</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>
                This week's simulation leaderboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Alex Chen", score: 2850, avatar: "👨‍💻" },
                  { rank: 2, name: "Sarah Johnson", score: 2720, avatar: "👩‍💻" },
                  {
                    rank: 3,
                    name: "Mike Rodriguez",
                    score: 2650,
                    avatar: "👨‍🎓",
                  },
                  {
                    rank: 4,
                    name: "You",
                    score: 2400,
                    avatar: "🧑‍💻",
                    isUser: true,
                  },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      user.isUser ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                        {user.rank === 1
                          ? "🥇"
                          : user.rank === 2
                          ? "🥈"
                          : user.rank === 3
                          ? "🥉"
                          : user.rank}
                      </div>
                      <div className="text-xl">{user.avatar}</div>
                      <div>
                        <h4 className="text-sm">{user.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Rank #{user.rank}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{user.score}</div>
                      <div className="text-xs text-muted-foreground">
                        points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
