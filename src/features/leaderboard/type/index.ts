export type LeaderboardData = {
  global: {
    id: string;
    name: string;
    image: string;
    UserStat: {
      averageScore: number;
      totalQuizzes: number;
    };
    score: number;
    rank: number;
    streak: number;
  }[];
  monthly: {
    id: string;
    name: string;
    image: string;
    UserStat: {
      averageScore: number;
      totalQuizzes: number;
    };
    score: number;
    rank: number;
    streak: number;
  }[];
  weekly: {
    id: string;
    name: string;
    image: string;
    UserStat: {
      averageScore: number;
      totalQuizzes: number;
    };
    score: number;
    rank: number;
    streak: number;
  }[];
  categories: {
    name: string;
    leaders: {
      id: string;
      name: string;
      image: string;
      score: number;
      category: string;
    }[];
  }[];
  stats: {
    totalPlayers: number;
    totalQuizzes: number;
    averageScore: number;
  };
  currentUserId: string;
};
