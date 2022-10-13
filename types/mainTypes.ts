export type Answer = {
  _id: string;
  user: string;
  name: string;
  answers: { question: string; answer: string }[];
  read: boolean | undefined;
  date: string;
}[];

export type Message = {
  _id: string;
  user: string;
  name: string;
  message: string;
  read: boolean | undefined;
  date: string;
}[];

export interface AllDocs<T> {
  docs: T;
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
  messages: number;
  unread: number;
  unreadMessages: number;
}
