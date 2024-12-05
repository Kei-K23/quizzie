"use client";

import { Card } from "@/components/ui/card";
import { Brain, Target, Users } from "lucide-react";

interface LeaderboardStatsProps {
  stats: {
    totalPlayers: number;
    totalQuizzes: number;
    averageScore: number;
  };
}

export function LeaderboardStats({ stats }: LeaderboardStatsProps) {
  return (
    <div className="flex w-full flex-col md:justify-end md:flex-row gap-4">
      <Card className="p-4 flex items-center gap-3">
        <Users className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Players</p>
          <p className="text-xl font-bold">{stats.totalPlayers}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center gap-3">
        <Brain className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Quizzes</p>
          <p className="text-xl font-bold">{stats.totalQuizzes}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center gap-3">
        <Target className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Avg. Score</p>
          <p className="text-xl font-bold">{stats.averageScore}%</p>
        </div>
      </Card>
    </div>
  );
}
