import React from "react";
import { PageLayout } from "../component/layout/PageLayout";
import { AllColumnBox, AllFont } from "../style/AllStyle";
import { BackButton } from "../component/BackButton";
import { HeadLine } from "./SurveyStart";
import { ProgressBar } from "../component/ProgressBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerState,
  modalStste,
  questionState,
  surveyTypeState,
} from "../recoil/store";
import axios from "axios";
import { ResetUserAnswerModal } from "../component/ResetUserAnswerModal";
import { SelectOneAnswer } from "../component/SelectOneAnswer";
import { SelectVariousAnswer } from "../component/SelectVariousAnswer";
import { Finish } from "../component/Finish";

export const SurveyProgress = () => {
  const surveyType = useRecoilValue(surveyTypeState);
  const [questionList, setQuestionList] = useRecoilState(questionState);
  const setAnswerList = useSetRecoilState(answerState);
  const setResetUserAnswer = useSetRecoilState(modalStste);

  const baseApi = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000,
  });

  const questionGet = async () => {
    await baseApi.get(`/questions.json`).then((res) => {
      setQuestionList({ ...questionList, questions: res.data.questions });
    });
  };

  const answerGet = async () => {
    await baseApi.get(`/answers.json`).then((res) => {
      setAnswerList(res.data);
    });
  };

  React.useEffect(() => {
    questionGet();
    answerGet();
  }, []);

  return (
    <PageLayout>
      {questionList.currentnumber ===
      surveyType.surveys[surveyType.userId].questions.length ? (
        <Finish />
      ) : (
        <>
          <HeadLine className="상단Nav, 헤드라인">
            <BackButton
              btnOnClick={() => setResetUserAnswer(true)}
            ></BackButton>
          </HeadLine>
          <ProgressBar />
          <AllColumnBox className="설문 title 정보">
            <AllFont isBold={true} size={20}>
              {surveyType.surveys[surveyType.userId].title}
            </AllFont>
          </AllColumnBox>
          <SelectOneAnswer />
          <SelectVariousAnswer />
          <ResetUserAnswerModal />
        </>
      )}
    </PageLayout>
  );
};
