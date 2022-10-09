import React from "react";
import {
  ActiveClickBox,
  AllColumnBox,
  AllFont,
  AllRowBox,
  ArrowImg,
} from "../style/AllStyle";
import beforeimg from "../assets/icons/icon-back-grey.png";
import nextimg from "../assets/icons/icon-next-icon.png";
import nextactiveimg from "../assets/icons/icon-next-primary.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerState,
  modalStste,
  questionState,
  surveyTypeState,
  userAnswerState,
} from "../recoil/store";
import { ResetUserAnswerModal } from "./ResetUserAnswerModal";

export const SelectOneAnswer = () => {
  const surveyType = useRecoilValue(surveyTypeState);
  const [questionList, setQuestionList] = useRecoilState(questionState);
  const answerList = useRecoilValue(answerState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const setResetUserAnswer = useSetRecoilState(modalStste);

  return (
    <>
      {answerList.answers.length !== 0 &&
        questionList.questions.map((question, questionIndex) => {
          if (
            question.mode === 0 && //조건 - 단수 선택
            questionIndex === questionList.currentnumber
          ) {
            return (
              <div className="단수 선택형 컨텐츠 부분" key={questionIndex}>
                <AllRowBox
                  className="문제번호"
                  width={45}
                  height={20}
                  margin="20px auto 10px 0"
                  columnGap={10}
                >
                  <AllFont isBold={true}>
                    {
                      <span style={{ fontSize: "20px" }}>
                        {questionList.currentnumber + 1}
                      </span>
                    }
                  </AllFont>
                  <AllFont color="#cccccc" size={14}>
                    / {surveyType.surveys[surveyType.userId].questions.length}
                  </AllFont>
                </AllRowBox>
                <AllFont className="문제" color="#444444">
                  {question.title}
                </AllFont>
                <AllColumnBox
                  className="보기"
                  margin="25px auto 100px auto"
                  rowGap={10}
                >
                  {answerList.answers.map((answer, answerIndex) => {
                    if (
                      questionList.questions[questionIndex].answers.includes(
                        answerIndex
                      )
                    ) {
                      return (
                        <ActiveClickBox
                          key={answerIndex}
                          onClick={() => {
                            // 클릭 시 현재 문항 문제와 답변 저장
                            setUserAnswer(
                              userAnswer.map((e, i) => {
                                if (i === questionList.currentnumber) {
                                  return {
                                    question: question.title,
                                    answer: [answer],
                                  };
                                } else {
                                  return e;
                                }
                              })
                            );
                          }}
                          isActive={
                            // 선택한 답변을 active로 노랑음영 표시. 이전 답변도 불러와서 페이지 이동 시에도 확인 가능
                            userAnswer[
                              questionList.currentnumber
                            ]?.answer.includes(answer)
                              ? true
                              : false
                          }
                        >
                          {answer}
                        </ActiveClickBox>
                      );
                    } else {
                      return null;
                    }
                  })}
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
                      questionList.currentnumber === 0
                        ? setResetUserAnswer(true)
                        : setQuestionList({
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
                    isCursor={
                      userAnswer[questionList.currentnumber].answer.length
                        ? true
                        : false
                    }
                    onClick={() =>
                      userAnswer[questionList.currentnumber].answer.length &&
                      setQuestionList({
                        ...questionList,
                        currentnumber: questionList.currentnumber + 1,
                      })
                    }
                  >
                    <AllFont
                      isBold={true}
                      color={
                        userAnswer[questionList.currentnumber].answer.length
                          ? "var(--theme-color)"
                          : "#cccccc"
                      }
                    >
                      다음
                    </AllFont>
                    <ArrowImg
                      src={
                        userAnswer[questionList.currentnumber].answer.length
                          ? nextactiveimg
                          : nextimg
                      }
                      alt="->이미지"
                    ></ArrowImg>
                  </AllRowBox>
                </AllRowBox>
              </div>
            );
          } else {
            return null;
          }
        })}
      <ResetUserAnswerModal />
    </>
  );
};
