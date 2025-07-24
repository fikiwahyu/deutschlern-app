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
import { Play, Users, Star, Clock } from "lucide-react";

interface SimulationCardProps {
  simulation: any;
  onStart: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "advanced":
      return "bg-orange-100 text-orange-800";
    case "expert":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function SimulationCard({ simulation, onStart }: SimulationCardProps) {
  const IconComponent = simulation.icon;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-lg ${simulation.color} flex items-center justify-center text-white`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl">{simulation.title}</CardTitle>
              <CardDescription className="mt-1">
                {simulation.description}
              </CardDescription>
            </div>
          </div>
          <Badge className={getDifficultyColor(simulation.difficulty)}>
            {simulation.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{simulation.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{simulation.participants.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{simulation.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {simulation.scenarios} scenarios
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {simulation.skills.map((skill: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <Button onClick={onStart} className="w-full">
          <Play className="w-4 h-4 mr-2" />
          Start Simulation
        </Button>
      </CardContent>
    </Card>
  );
}
