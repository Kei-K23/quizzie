export type ProfileData = {
  stats: {
    userId: string;
    totalQuizzes: number;
    totalCorrectAnswers: number;
    totalWrongAnswers: number;
    averageScore: number;
    lastActive: Date;
    level: number;
    xp: number;
    currentStreak: number;
    longestStreak: number;
    rank: number;
  };
  achievements: [];
  badges: [];
  quizHistory: {
    id: string;
    userId: string;
    category: string;
    difficulty: string;
    questionType: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    status: string;
    timeTaken: number;
    score: number;
    quizDate: string;
  }[];
};
