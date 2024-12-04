import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    // Get global leaderboard
    const globalLeaders = await prisma.leaderboard.findMany({
      take: 100,
      orderBy: { score: "desc" },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            UserStat: true,
            streaks: true,
          },
        },
      },
    });

    // Get monthly leaderboard
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthlyLeaders = await prisma.quizTaken.groupBy({
      by: ["userId"],
      where: {
        quizDate: {
          gte: monthStart,
        },
      },
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: "desc",
        },
      },
      take: 100,
    });

    // Get weekly leaderboard
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyLeaders = await prisma.quizTaken.groupBy({
      by: ["userId"],
      where: {
        quizDate: {
          gte: weekStart,
        },
      },
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: "desc",
        },
      },
      take: 100,
    });

    // Get category leaders
    const categories = await prisma.quizTaken.groupBy({
      by: ["category"],
      _count: true,
    });

    const categoryLeaders = await Promise.all(
      categories.map(async (cat) => {
        const leaders = await prisma.quizTaken.groupBy({
          by: ["userId"],
          where: {
            category: cat.category,
          },
          _sum: {
            score: true,
          },
          orderBy: {
            _sum: {
              score: "desc",
            },
          },
          take: 3,
        });

        return {
          name: cat.category,
          leaders: await Promise.all(
            leaders.map(async (leader) => {
              const user = await prisma.user.findUnique({
                where: { id: leader.userId },
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              });
              return {
                ...user,
                score: leader._sum.score,
              };
            })
          ),
        };
      })
    );

    // Get overall stats
    const stats = {
      totalPlayers: await prisma.user.count(),
      totalQuizzes: await prisma.quizTaken.count(),
      averageScore: await prisma.userStat.aggregate({
        _avg: {
          averageScore: true,
        },
      }),
    };

    return NextResponse.json({
      global: globalLeaders,
      monthly: monthlyLeaders,
      weekly: weeklyLeaders,
      categories: categoryLeaders,
      stats: {
        totalPlayers: stats.totalPlayers,
        totalQuizzes: stats.totalQuizzes,
        averageScore: Math.round(
          stats.averageScore._avg.averageScore?.toNumber() || 0
        ),
      },
      currentUserId: userId,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
