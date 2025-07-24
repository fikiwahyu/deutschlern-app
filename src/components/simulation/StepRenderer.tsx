import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Lightbulb, CheckCircle2, XCircle } from "lucide-react";

interface StepRendererProps {
  step: any;
  simulationStep: number;
  userInput: string;
  setUserInput: (value: string) => void;
  onAnswer: (answer: any) => void;
  onCodeSubmit: () => void;
}

export function StepRenderer({
  step,
  simulationStep,
  userInput,
  setUserInput,
  onAnswer,
  onCodeSubmit,
}: StepRendererProps) {
  return (
    <Card className="min-h-96">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">Step {simulationStep + 1}</Badge>
          <Badge
            variant={
              step.type === "info"
                ? "secondary"
                : step.type === "question"
                ? "default"
                : step.type === "code"
                ? "outline"
                : "default"
            }
          >
            {step.type === "info"
              ? "Information"
              : step.type === "question"
              ? "Question"
              : step.type === "code"
              ? "Code Challenge"
              : "Result"}
          </Badge>
        </div>
        <CardTitle className="text-xl">{step.title}</CardTitle>
        <CardDescription>{step.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step.type === "info" && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{step.content}</pre>
            </div>
            {step.hint && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>{step.hint}</AlertDescription>
              </Alert>
            )}
            <Button onClick={() => onAnswer(null)} className="w-full">
              Continue
            </Button>
          </div>
        )}

        {step.type === "question" && (
          <div className="space-y-4">
            <div className="space-y-3">
              {step.options?.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start p-4 h-auto text-left"
                  onClick={() => onAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step.type === "code" && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">{step.template}</pre>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Your Solution:</label>
              <textarea
                className="w-full min-h-24 p-3 border rounded-lg resize-none font-mono text-sm"
                placeholder="Enter your code fix here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <Button onClick={onCodeSubmit} className="w-full">
              Submit Solution
            </Button>
          </div>
        )}

        {step.type === "result" && (
          <div className="space-y-4 text-center">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                step.success
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {step.success ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg">
                {step.success ? "Well Done!" : "Try Again"}
              </h3>
              <p className="text-muted-foreground">{step.feedback}</p>
            </div>
            <Button onClick={() => onAnswer(null)} className="w-full">
              Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
