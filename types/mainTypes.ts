export type Answer = {
  _id: string;
  user: string;
  name: string;
  answers: { question: string; answer: string }[];
  date: string;
}[];

export interface AllAnswers {
  docs: Answer;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean | null;
  hasNextPage: boolean | null;
  prevPage: number | null;
  nextPage: number | null;
}

export type Questions = {
  _id: string;
  content: string;
  date: string;
}[];

export interface User {
  _id: string;
  name: string;
  email?: string;
  role?: string;
  questions: number;
  answers: number;
}
