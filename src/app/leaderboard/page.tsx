/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { LeaderboardStats } from "@/features/leaderboard/components/leaderboard-stats";
import { LeaderboardTable } from "@/features/leaderboard/components/leaderboard-table";
import { CategoryLeaders } from "@/features/leaderboard/components/category-leaders";
import { LeaderboardData } from "@/features/leaderboard/type";

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        console.log(data);

        setLeaderboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <LeaderboardStats stats={leaderboardData?.stats!} />
      </div>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <Card className="p-6">
            <LeaderboardTable
              leaders={leaderboardData?.global!}
              currentUserId={leaderboardData?.currentUserId!}
            />
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="p-6">
            <LeaderboardTable
              leaders={leaderboardData?.monthly!}
              currentUserId={leaderboardData?.currentUserId!}
            />
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="p-6">
            <LeaderboardTable
              leaders={leaderboardData?.weekly!}
              currentUserId={leaderboardData?.currentUserId!}
            />
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <CategoryLeaders categories={leaderboardData?.categories!} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
