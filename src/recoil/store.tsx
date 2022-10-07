import { atom } from "recoil";

export type surveyTypeGather = {
  surveys: { title: string; questions: number[] }[];
  userId: number;
  userName: string | null;
};

export const surveyTypeState = atom<surveyTypeGather>({
  key: "surveyTypeState",
  default: {
    surveys: [{ title: "", questions: [] }],
    userId: -1,
    userName: "",
  },
});

export type questionGather = {
  questions: { title: string; mode: number; answers: number[] }[];
  currentnumber: number;
};

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

export const selectOneState = atom<number>({
  key: "selectOneState",
  default: -1,
});

export const selectVariousState = atom<number[]>({
  key: "selectVariousState",
  default: [],
});

export const selectOneAnswerState = atom<string[]>({
  key: "selectOneAnswerState",
  default: [],
});

export const selectVariousAnswerState = atom<string[]>({
  key: "selectVariousAnswerState",
  default: [],
});
