import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    if (!body || typeof body !== "object") {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { category, score, timeTaken } = body as {
      category: string;
      score: number;
      timeTaken: number;
    };

    if (
      !category ||
      typeof score !== "number" ||
      typeof timeTaken !== "number"
    ) {
      return new NextResponse("Missing or invalid fields", { status: 400 });
    }

    // TODO: remove hard-coded total quiz number
    const totalQuestions = 10;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;

    // Save quiz result
    await prisma.quizTaken.create({
      data: {
        category,
        score,
        timeTaken,
        difficulty: "medium",
        questionType: "multiple",
        status: score >= 7 ? "PASSED" : "FAILED",
        correctAnswers,
        wrongAnswers,
        totalQuestions,
        userId: session.user.id!,
      },
    });

    // Update user stats
    const stats = await prisma.userStat.findUnique({
      where: { userId: session.user.id! },
    });
    const newAverageScore = stats
      ? (stats.averageScore.toNumber() * stats.totalQuizzes + score) /
        (stats.totalQuizzes + 1)
      : score;

    // Update averageScore
    await prisma.userStat.upsert({
      where: { userId: session.user.id },
      update: {
        totalQuizzes: { increment: totalQuestions },
        totalCorrectAnswers: { increment: score },
        totalWrongAnswers: { increment: totalQuestions - score },
        averageScore: {
          set: newAverageScore,
        },
      },
      create: {
        userId: session.user.id!,
        totalQuizzes: totalQuestions,
        totalCorrectAnswers: score,
        totalWrongAnswers: totalQuestions - score,
        averageScore: score,
      },
    });

    // Update streak
    const streak = await prisma.streak.findUnique({
      where: { userId: session.user.id! },
    });
    const newLongestStreak = streak
      ? Math.max(streak.longestStreak, streak.currentStreak + 1)
      : 1;

    // Update streak
    await prisma.streak.upsert({
      where: { userId: session.user.id },
      update: {
        currentStreak: {
          increment: 1,
        },
        longestStreak: {
          set: newLongestStreak,
        },
        lastQuizDate: new Date(),
      },
      create: {
        userId: session.user.id!,
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
          userId: session.user.id!,
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
