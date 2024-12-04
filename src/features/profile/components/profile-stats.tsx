"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award, Brain, Flame, Target, Trophy, Users } from "lucide-react";

interface ProfileStatsProps {
  stats: {
    totalQuizzes: number;
    totalCorrectAnswers: number;
    totalWrongAnswers: number;
    averageScore: number;
    currentStreak: number;
    longestStreak: number;
    rank: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      icon: Brain,
      label: "Total Quizzes",
      value: stats.totalQuizzes,
    },
    {
      icon: Target,
      label: "Correct Answers",
      value: stats.totalCorrectAnswers,
    },
    {
      icon: Award,
      label: "Average Score",
      value: `${stats.averageScore.toFixed(1)}%`,
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: stats.currentStreak,
    },
    {
      icon: Trophy,
      label: "Longest Streak",
      value: stats.longestStreak,
    },
    {
      icon: Users,
      label: "Global Rank",
      value: `#${stats.rank}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
