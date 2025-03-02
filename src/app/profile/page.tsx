"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileStats } from "@/features/profile/components/profile-stats";
import { ProfileAchievements } from "@/features/profile/components/profile-achievements";
import { QuizHistory } from "@/features/profile/components/quiz-history";
import { UserBadges } from "@/features/profile/components/user-badges";
import { ProfileData } from "@/features/profile/type";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        console.log(data);

        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchProfileData();
    }
  }, [session, status, router]);

  if (loading || !profileData) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
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
      <div className="flex items-center gap-4">
        <img
          src={session?.user?.image || ""}
          alt={session?.user?.name || "User"}
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
          <p className="text-muted-foreground">
            Level {profileData.stats.level}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>XP Progress</span>
          <span>{profileData.stats.xp}/10000 XP</span>
        </div>
        <Progress value={(profileData.stats.xp % 1000) / 100} />
      </div>

      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <ProfileStats stats={profileData.stats} />
        </TabsContent>

        <TabsContent value="achievements">
          <ProfileAchievements achievements={profileData.achievements} />
        </TabsContent>

        <TabsContent value="badges">
          <UserBadges badges={profileData.badges} />
        </TabsContent>

        <TabsContent value="history">
          <QuizHistory history={profileData.quizHistory} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
