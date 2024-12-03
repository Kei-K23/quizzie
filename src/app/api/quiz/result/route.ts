import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { category, score, timeTaken } = await req.json();

    // Save quiz result
    const quizTaken = await prisma.quizTaken.create({
      data: {
        id: session.user.id,
        category,
        score,
        timeTaken,
        difficulty: "medium",
        questionType: "multiple",
        status: score >= 7 ? "PASSED" : "FAILED",
      },
    });

    // Update user stats
    await prisma.userStat.upsert({
      where: { userId: session.user.id },
      update: {
        totalQuizzes: { increment: 1 },
        totalCorrectAnswers: { increment: score },
        totalWrongAnswers: { increment: 10 - score },
        averageScore: {
          set: prisma.userStat
            .findUnique({ where: { userId: session.user.id } })
            .then((stats) => {
              if (!stats) return score;
              return (
                (stats.averageScore.toNumber() * stats.totalQuizzes + score) /
                (stats.totalQuizzes + 1)
              );
            }),
        },
      },
      create: {
        userId: session.user.id,
        totalQuizzes: 1,
        totalCorrectAnswers: score,
        totalWrongAnswers: 10 - score,
        averageScore: score,
      },
    });

    // Update streak
    await prisma.streak.upsert({
      where: { userId: session.user.id },
      update: {
        currentStreak: {
          increment: 1,
        },
        longestStreak: {
          increment: (streak) =>
            streak.currentStreak + 1 > streak.longestStreak ? 1 : 0,
        },
        lastQuizDate: new Date(),
      },
      create: {
        userId: session.user.id,
        currentStreak: 1,
        longestStreak: 1,
        lastQuizDate: new Date(),
      },
    });

    // Check and award achievements
    let achievement = null;
    if (score === 10) {
      achievement = await prisma.achievement.create({
        data: {
          userId: session.user.id,
          name: "Perfect Score",
          description: "Score 100% on a quiz",
          icon: "trophy",
        },
      });
    }

    return NextResponse.json({ success: true, achievement });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
