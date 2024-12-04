"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown, Medal, Trophy } from "lucide-react";

interface Leader {
  id: string;
  name: string;
  image: string;
  score: number;
  rank: number;
  quizzesTaken: number;
  averageScore: number;
  streak: number;
}

interface LeaderboardTableProps {
  leaders: Leader[];
  currentUserId: string;
}

export function LeaderboardTable({
  leaders,
  currentUserId,
}: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead>Score</TableHead>
          <TableHead className="hidden md:table-cell">Quizzes</TableHead>
          <TableHead className="hidden md:table-cell">Avg. Score</TableHead>
          <TableHead className="hidden md:table-cell">Streak</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaders.map((leader, index) => (
          <motion.tr
            key={leader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${leader.id === currentUserId ? "bg-primary/5" : ""}`}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                {getRankIcon(leader.rank)}
                {leader.rank}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={leader.image} />
                  <AvatarFallback>
                    {leader.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{leader.name}</span>
                {leader.id === currentUserId && (
                  <Badge variant="secondary">You</Badge>
                )}
              </div>
            </TableCell>
            <TableCell>{leader.score}</TableCell>
            <TableCell className="hidden md:table-cell">
              {leader.quizzesTaken}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {leader.averageScore}%
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                {leader.streak}
              </div>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  );
}
