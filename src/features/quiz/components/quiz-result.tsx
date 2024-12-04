"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { Award, Clock, RotateCcw, Trophy, User } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  category: string;
  timeTaken: number;
}

export function QuizResult({
  score,
  totalQuestions,
  category,
  timeTaken,
}: QuizResultProps) {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const percentage = (score / totalQuestions) * 100;
  const hasSavedResult = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasSavedResult.current) {
      hasSavedResult.current = true;

      const saveResult = async () => {
        try {
          const response = await fetch("/api/quiz/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category,
              score,
              timeTaken,
            }),
          });

          if (!response.ok) throw new Error("Failed to save result");

          const data = await response.json();
          if (data.achievement) {
            //   toast({
            //     title: "Achievement Unlocked! 🎉",
            //     description: data.achievement.name,
            //   });
            toast.success("Achievement Unlocked! 🎉");
          }
        } catch (error) {
          console.error("Error saving result:", error);
        }
      };

      saveResult();

      // Start timer for confetti
      timerRef.current = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }

    // Cleanup timer on component unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [category, score, timeTaken]);

  return (
    <>
      {showConfetti && percentage >= 10 && <Confetti />}
      <Card className="max-w-2xl mx-auto p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Quiz Complete!</h2>
            <p className="text-muted-foreground">
              Here&apos;s how you performed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
              <Trophy className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">
                {score}/{totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>

            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
              <Award className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{percentage.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>

            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
              <Clock className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">
                {Math.floor(timeTaken / 60)}:
                {(timeTaken % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={() => router.push(`/quiz/${category}`)}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              onClick={() => router.push("/profile")}
              variant="outline"
              className="gap-2"
            >
              <User className="w-4 h-4" />
              View Profile
            </Button>
          </div>
        </motion.div>
      </Card>
    </>
  );
}
