import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [userStats, achievements, badges, quizHistory, streak, leaderboard] =
      await Promise.all([
        prisma.userStat.findUnique({
          where: { userId: session.user.id },
        }),
        prisma.achievement.findMany({
          where: { userId: session.user.id },
          orderBy: { unlockedAt: "desc" },
        }),
        prisma.badge.findMany({
          where: { userId: session.user.id },
          orderBy: { unlockedAt: "desc" },
        }),
        prisma.quizTaken.findMany({
          where: { userId: session.user.id },
          orderBy: { quizDate: "desc" },
          take: 10,
        }),
        prisma.streak.findUnique({
          where: { userId: session.user.id },
        }),
        prisma.leaderboard.findUnique({
          where: { userId: session.user.id },
        }),
      ]);

    const stats = {
      ...userStats,
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0,
      rank: leaderboard?.rank || 0,
    };

    return NextResponse.json({
      stats,
      achievements,
      badges,
      quizHistory,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
