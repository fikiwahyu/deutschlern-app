import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Trophy, Target, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

interface SimulationResultsProps {
  score: number;
  onBackToBrowse: () => void;
}

export function SimulationResults({
  score,
  onBackToBrowse,
}: SimulationResultsProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <Trophy className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl">Simulation Complete!</h1>
        <p className="text-muted-foreground">
          Great job working through the scenario
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-5xl text-primary mb-2">{score}</div>
              <p className="text-muted-foreground">Total Points Earned</p>
            </div>
            <Progress value={(score / 100) * 100} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-lg">4/4</div>
                <p className="text-muted-foreground">Steps Completed</p>
              </div>
              <div>
                <div className="text-lg">100%</div>
                <p className="text-muted-foreground">Accuracy</p>
              </div>
              <div>
                <div className="text-lg">12:30</div>
                <p className="text-muted-foreground">Time Taken</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills Improved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                "React Hooks",
                "Performance Optimization",
                "Debugging",
                "Problem Solving",
              ].map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button onClick={onBackToBrowse}>Try Another Simulation</Button>
          <Button variant="outline">Share Result</Button>
        </div>
      </div>
    </div>
  );
}
