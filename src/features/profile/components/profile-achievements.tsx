"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface ProfileAchievementsProps {
  achievements: Achievement[];
}

export function ProfileAchievements({
  achievements,
}: ProfileAchievementsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Unlocked on{" "}
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
