import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  questionState,
  surveyTypeState,
  userAnswerState,
} from "../recoil/store";
import { AllColumnBox, AllFont, AllRowBox, ArrowImg } from "../style/AllStyle";
import finishimg from "../assets/icons/image-survey-done.png";
import beforeimg from "../assets/icons/icon-back-grey.png";
import nextactiveimg from "../assets/icons/icon-next-primary.png";

const FinishImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px auto;
`;

export const Finish = () => {
  const surveyType = useRecoilValue(surveyTypeState);
  const userAnswer = useRecoilValue(userAnswerState);
  const [questionList, setQuestionList] = useRecoilState(questionState);

  function UserDataAlert() {
    let alertContent = "";
    userAnswer.forEach((el) => {
      alertContent += `${el.question} : ${el.answer}\n`;
    });
    return alertContent;
  }

  return (
    <>
      <AllColumnBox margin="195px auto">
        <FinishImg src={finishimg} alt="종료 체크 이미지" />
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
              currentnumber: questionList.currentnumber - 1,
            });
          }}
        >
          <ArrowImg src={beforeimg} alt="<- 이미지"></ArrowImg>
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
          <AllFont isBold={true} color={"var(--theme-color)"}>
            다음
          </AllFont>
          <ArrowImg src={nextactiveimg} alt="-> 이미지"></ArrowImg>
        </AllRowBox>
      </AllRowBox>
    </>
  );
};
