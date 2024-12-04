import axios from "axios";

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: Question[];
}

export async function fetchQuizQuestions(
  category: string,
  amount: number = 10
) {
  const categoryId = getCategoryId(category);
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&type=multiple`;

  try {
    const response = await axios.get<QuizResponse>(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
}

function getCategoryId(category: string): number {
  const categories: Record<string, number> = {
    general: 9,
    science: 17,
    history: 23,
    tech: 18,
    arts: 25,
    entertainment: 11,
    literature: 10,
    sports: 21,
  };

  return categories[category] || 9;
}
