import React from "react";

// Mock data for the leaderboard - in a real app, this would come from your backend.
const leaderboardData = [
  {
    id: 1,
    name: "Anna Schmidt",
    score: 1250,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Lukas Müller",
    score: 1100,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "Sophie Weber",
    score: 1050,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    name: "Max Wagner",
    score: 980,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 5,
    name: "Lena Becker",
    score: 920,
    avatar: "https://github.com/shadcn.png",
  },
  { id: 6, name: "Paul Hoffmann", score: 850, avatar: "" },
  { id: 7, name: "Clara Schulz", score: 780, avatar: "" },
];

export const LeaderboardPage = () => {
  // NOTE: The following JSX assumes you have shadcn/ui components like
  // Card, CardHeader, CardTitle, CardContent, Avatar, AvatarImage, and AvatarFallback.
  // If not, you can replace them with standard HTML elements.
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Top Learners</h2>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <ul className="space-y-4">
            {leaderboardData
              .sort((a, b) => b.score - a.score)
              .map((user, index) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-lg w-6">{index + 1}</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="font-bold text-primary">
                    {user.score} XP
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
