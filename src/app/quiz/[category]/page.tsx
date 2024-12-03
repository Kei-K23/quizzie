"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Timer } from "@/components/timer";
import { QuizResult } from "@/components/quiz-result";
import { Loader2 } from "lucide-react";
import { fetchQuizQuestions, Question } from "@/lib/api/quiz";

export default function QuizPage() {
  const { category } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (!session) {
      router.push("/");
      return;
    }

    const loadQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(category as string);
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, [category, session, router]);

  const handleAnswer = (answer: string) => {
    const correct = answer === questions[currentQuestion].correct_answer;
    if (correct) setScore(score + 1);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (showResult) {
    return (
      <QuizResult
        score={score}
        totalQuestions={questions.length}
        category={category as string}
        timeTaken={timeTaken}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">{category} Quiz</h1>
          <Timer onTimeUpdate={setTimeTaken} />
        </div>
        <Progress
          value={(currentQuestion / questions.length) * 100}
          className="h-2"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion]?.question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                questions[currentQuestion]?.correct_answer,
                ...questions[currentQuestion]?.incorrect_answers,
              ]
                .sort(() => Math.random() - 0.5)
                .map((answer, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-6 h-auto text-left"
                    onClick={() => handleAnswer(answer)}
                  >
                    {answer}
                  </Button>
                ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
