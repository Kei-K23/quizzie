"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Trophy, Users } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold tracking-tight"
      >
        Challenge Your Mind with{" "}
        <span className="text-primary">QuizMaster</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl text-muted-foreground max-w-2xl mx-auto"
      >
        Test your knowledge, compete with friends, and climb the leaderboard in
        our gamified quiz platform.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center gap-4 flex-wrap"
      >
        <Link href="/quiz">
          <Button size="lg" className="gap-2">
            <Brain className="w-5 h-5" />
            Start Quiz
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button size="lg" variant="outline" className="gap-2">
            <Trophy className="w-5 h-5" />
            View Leaderboard
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
      >
        <div className="flex flex-col items-center gap-2">
          <Users className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-semibold">10k+ Users</h3>
          <p className="text-muted-foreground">Join our growing community</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-semibold">1000+ Questions</h3>
          <p className="text-muted-foreground">Across various categories</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Trophy className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-semibold">Daily Rewards</h3>
          <p className="text-muted-foreground">Earn badges and achievements</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
