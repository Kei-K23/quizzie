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
    const { category, score, timeTaken } = body as {
      category: string;
      score: number;
      timeTaken: number;
    };

    const totalQuestions = 10;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;

    const baseXpPerCorrectAnswer = 10;
    const bonusXpForCompletion = 20;
    const difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 };
    const multiplier = difficultyMultiplier["medium"];
    const xpEarned =
      correctAnswers * baseXpPerCorrectAnswer * multiplier +
      bonusXpForCompletion;

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

    const stats = await prisma.userStat.findUnique({
      where: { userId: session.user.id! },
    });
    const newXp = (stats?.xp ?? 0) + xpEarned;
    const newLevel = Math.floor(newXp / 100) + 1;

    await prisma.userStat.upsert({
      where: { userId: session.user.id },
      update: {
        xp: { set: newXp },
        level: { set: newLevel },
        totalQuizzes: { increment: 1 },
        totalCorrectAnswers: { increment: correctAnswers },
        totalWrongAnswers: { increment: wrongAnswers },
        averageScore: {
          set: stats
            ? (stats.averageScore.toNumber() * stats.totalQuizzes + score) /
              (stats.totalQuizzes + 1)
            : score,
        },
      },
      create: {
        userId: session.user.id!,
        xp: newXp,
        level: newLevel,
        totalQuizzes: 1,
        totalCorrectAnswers: correctAnswers,
        totalWrongAnswers: wrongAnswers,
        averageScore: score,
      },
    });

    return NextResponse.json({ success: true, xpEarned, level: newLevel });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
