import React, { useEffect, useState } from "react";
import { PageLayout } from "../component/layout/PageLayout";
import styled from "styled-components";
import {
  ActiveClickBox,
  AllBtn,
  AllColumnBox,
  AllFont,
  AllFontBox,
  AllRowBox,
  ArrowImg,
} from "../style/AllStyle";
import { BackButton } from "../component/BackButton";
import finishimg from "../assets/icons/image-survey-done.png";
import beforeimg from "../assets/icons/icon-back-grey.png";
import nextimg from "../assets/icons/icon-next-icon.png";
import nextactiveimg from "../assets/icons/icon-next-primary.png";
import { HeadLine } from "./SurveyStart";
import { useNavigate } from "react-router";
import { ProgressBar } from "../component/ProgressBar";
import { useRecoilState } from "recoil";
import {
  answerState,
  questionState,
  surveyTypeState,
  userAnswerState,
} from "../recoil/store";

const FinishImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px auto;
`;

export const SurveyFinish = () => {
  const [surveyType, setSurveyType] = useRecoilState(surveyTypeState);
  const [select, setSelect] = useState<number[]>([]);
  const [answerList, setAnswerList] = useRecoilState(answerState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const [questionList, setQuestionList] = useRecoilState(questionState);
  const nav = useNavigate();

  function UserDataAlert() {
    let alertContent = "";
    userAnswer.forEach((el) => {
      alertContent += `${el.question} : ${el.answer}\n`;
    });
    return alertContent;
  }

  return (
    <PageLayout>
      <AllColumnBox margin="195px auto">
        <FinishImg src={finishimg} />
        <AllFont isBold={true} align={"center"}>
          {surveyType.surveys[surveyType.userId].title}
        </AllFont>
        <AllFont align={"center"}>평가설문이 끝났습니다.</AllFont>
      </AllColumnBox>
      <AllRowBox
        className="하단 nav"
        margin="50px auto 20px auto"
        style={{ columnGap: "calc(100% - 200px)" }}
      >
        <AllRowBox
          className="이전부분"
          columnGap={5}
          isCursor={true}
          onClick={() => {
            setQuestionList({
              ...questionList,
              currentnumber: questionList.currentnumber,
            });
            const newUserAnswer = userAnswer.slice(0, userAnswer.length - 1);
            setUserAnswer(newUserAnswer);
            const pageBackTimer = setTimeout(() => {
              nav("/surveyselectone");
              clearTimeout(pageBackTimer);
            }, 200);
          }}
        >
          <ArrowImg src={beforeimg}></ArrowImg>
          <AllFont isBold={true} color="#444444">
            이전
          </AllFont>
        </AllRowBox>
        <AllRowBox
          className="다음부분"
          columnGap={5}
          isCursor={true}
          onClick={() => {
            alert(UserDataAlert());
          }}
        >
          <AllFont isBold={true} color={"#ffd600"}>
            다음
          </AllFont>
          <ArrowImg src={nextactiveimg}></ArrowImg>
        </AllRowBox>
      </AllRowBox>
    </PageLayout>
  );
};
