"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface QuizResult {
  id: string;
  category: string;
  score: number;
  status: string;
  timeTaken: number;
  quizDate: string;
}

interface QuizHistoryProps {
  history: QuizResult[];
}

export function QuizHistory({ history }: QuizHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell>
                  {new Date(quiz.quizDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="capitalize">{quiz.category}</TableCell>
                <TableCell>{quiz.score}/10</TableCell>
                <TableCell>
                  {Math.floor(quiz.timeTaken / 60)}:
                  {(quiz.timeTaken % 60).toString().padStart(2, "0")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      quiz.status === "PASSED" ? "default" : "destructive"
                    }
                  >
                    {quiz.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
}
