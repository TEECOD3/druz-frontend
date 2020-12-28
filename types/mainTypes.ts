export type Answers = {
  _id: string;
  user: string;
  name: string;
  answers: { question: string; answer: string }[];
  date: string;
}[];

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
