import { atom } from "recoil";

export interface surveyTypeGather {
  surveys: { title: string; questions: number[] }[];
  userId: number;
  userName: string | null;
}

export const surveyTypeState = atom<surveyTypeGather>({
  key: "surveyTypeState",
  default: {
    surveys: [{ title: "", questions: [] }],
    userId: -1,
    userName: "",
  },
});

export interface questionGather {
  questions: { title: string; mode: number; answers: number[] }[];
  currentnumber: number;
}

export const questionState = atom<questionGather>({
  key: "questionState",
  default: {
    questions: [{ title: "", mode: -1, answers: [] }],
    currentnumber: 0,
  },
});

export const answerState = atom<{ answers: string[] }>({
  key: "answerState",
  default: {
    answers: [],
  },
});

export type userAnswerGather = {
  question: string;
  answer: string[];
}[];

export const userAnswerState = atom<userAnswerGather>({
  key: "userAnswerState",
  default: [],
});

export const modalStste = atom<boolean>({
  key: "modalState",
  default: false,
});
