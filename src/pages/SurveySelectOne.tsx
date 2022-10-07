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
import surveyimg from "../assets/icons/image-survey.png";
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
  selectOneAnswerState,
  selectOneState,
  selectVariousAnswerState,
  selectVariousState,
  surveyTypeState,
  userAnswerState,
} from "../recoil/store";
import axios from "axios";

export const SurveySelectOne = () => {
  const nav = useNavigate();
  const [surveyType, setSurveyType] = useRecoilState(surveyTypeState);
  const [questionList, setQuestionList] = useRecoilState(questionState);
  const [answerList, setAnswerList] = useRecoilState(answerState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const [selectOne, setSelectOne] = useRecoilState(selectOneState);
  const [selectVarious, setSelectVarious] = useRecoilState(selectVariousState);
  const [selectOneAnswer, setSelectOneAnswer] =
    useRecoilState(selectOneAnswerState);
  const [selectVariousAnswer, setSelectVariousAnswer] = useRecoilState(
    selectVariousAnswerState
  );

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

  // console.log(questionList);
  // console.log(answerList);
  console.log(questionList.currentnumber);

  console.log(surveyType);
  console.log(userAnswer);
  return (
    <PageLayout>
      <HeadLine className="상단Nav, 헤드라인">
        <BackButton btnOnClick={() => nav(-1)}></BackButton>
      </HeadLine>
      <ProgressBar />
      <AllColumnBox className="분류">
        <AllFont isBold={true} size={20}>
          건강관리
        </AllFont>
      </AllColumnBox>
      {answerList.answers.length !== 0 &&
        questionList.questions.map((question, questionIndex) => {
          if (
            question.mode === 0 &&
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
                  <AllFont isBold={true} size={16}>
                    {
                      <span style={{ fontSize: "20px" }}>
                        {questionList.currentnumber + 1}
                      </span>
                    }
                  </AllFont>
                  <AllFont color="#cccccc">
                    / {surveyType.surveys[surveyType.userId].questions.length}
                  </AllFont>
                </AllRowBox>
                <AllFont className="문제">{question.title}</AllFont>
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
                          onClick={
                            selectOne !== answerIndex
                              ? () => {
                                  setSelectOne(answerIndex);
                                  setSelectOneAnswer([
                                    answerList.answers[answerIndex],
                                  ]);
                                }
                              : () => {
                                  setSelectOne(-1);
                                }
                          }
                          isActive={selectOne === answerIndex ? true : false}
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
                      const newUserAnswer = userAnswer.slice(
                        0,
                        userAnswer.length - 1
                      );
                      setUserAnswer(newUserAnswer);
                      const numberminusTimer = setTimeout(() => {
                        questionList.currentnumber === 0
                          ? nav("/")
                          : setQuestionList({
                              ...questionList,
                              currentnumber: questionList.currentnumber - 1,
                            });
                        clearTimeout(numberminusTimer);
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
                    isCursor={selectOne !== -1 ? true : false}
                    onClick={
                      selectOne !== -1
                        ? () => {
                            setUserAnswer([
                              ...userAnswer,
                              {
                                question:
                                  questionList.questions[questionIndex].title,
                                answer: selectOneAnswer,
                              },
                            ]);
                            const numberAddTimer = setTimeout(() => {
                              questionList.currentnumber + 1 ===
                              surveyType.surveys[surveyType.userId].questions
                                .length
                                ? nav("/surveyFinish")
                                : setQuestionList({
                                    ...questionList,
                                    currentnumber:
                                      questionList.currentnumber + 1,
                                  });
                              clearTimeout(numberAddTimer);
                            }, 200);
                          }
                        : () => {
                            ("");
                          }
                    }
                  >
                    <AllFont
                      isBold={true}
                      color={selectOne !== -1 ? "#ffd600" : "#cccccc"}
                    >
                      다음
                    </AllFont>
                    <ArrowImg
                      src={selectOne !== -1 ? nextactiveimg : nextimg}
                    ></ArrowImg>
                  </AllRowBox>
                </AllRowBox>
              </div>
            );
          } else if (
            question.mode === 1 &&
            questionIndex === questionList.currentnumber
          ) {
            return (
              <div className="복수 선택형 컨텐츠 부분" key={questionIndex}>
                <AllRowBox
                  className="문제번호"
                  width={45}
                  height={20}
                  margin="20px auto 10px 0"
                  columnGap={10}
                >
                  <AllFont isBold={true} size={16}>
                    {
                      <span style={{ fontSize: "20px" }}>
                        {questionList.currentnumber + 1}
                      </span>
                    }
                  </AllFont>
                  <AllFont color="#cccccc">
                    / {surveyType.surveys[surveyType.userId].questions.length}
                  </AllFont>
                </AllRowBox>
                <AllFont className="문제">{question.title}</AllFont>
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
                          onClick={
                            selectVarious.includes(answerIndex)
                              ? () => {
                                  setSelectVarious([]);
                                  setSelectVariousAnswer([]);
                                }
                              : () => {
                                  setSelectVarious([
                                    ...selectVarious,
                                    answerIndex,
                                  ]);
                                  setSelectVariousAnswer([
                                    ...selectVariousAnswer,
                                    answerList.answers[answerIndex],
                                  ]);
                                }
                          }
                          isActive={
                            selectVarious.includes(answerIndex) ? true : false
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
                      const newUserAnswer = userAnswer.slice(
                        0,
                        userAnswer.length - 1
                      );
                      setUserAnswer(newUserAnswer);
                      const numberminusTimer = setTimeout(() => {
                        questionList.currentnumber === 0
                          ? nav("/")
                          : setQuestionList({
                              ...questionList,
                              currentnumber: questionList.currentnumber - 1,
                            });
                        clearTimeout(numberminusTimer);
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
                    isCursor={selectVarious.length !== 0 ? true : false}
                    onClick={
                      selectVarious.length !== 0
                        ? () => {
                            setUserAnswer([
                              ...userAnswer,
                              {
                                question:
                                  questionList.questions[questionIndex].title,
                                answer: selectVariousAnswer,
                              },
                            ]);
                            const numberAddTimer = setTimeout(() => {
                              questionList.currentnumber + 1 ===
                              surveyType.surveys[surveyType.userId].questions
                                .length
                                ? nav("/surveyFinish")
                                : setQuestionList({
                                    ...questionList,
                                    currentnumber:
                                      questionList.currentnumber + 1,
                                  });
                              clearTimeout(numberAddTimer);
                            }, 200);
                          }
                        : () => {
                            ("");
                          }
                    }
                  >
                    <AllFont
                      isBold={true}
                      color={selectVarious.length !== 0 ? "#ffd600" : "#cccccc"}
                    >
                      다음
                    </AllFont>
                    <ArrowImg
                      src={selectVarious.length !== 0 ? nextactiveimg : nextimg}
                    ></ArrowImg>
                  </AllRowBox>
                </AllRowBox>
              </div>
            );
          } else {
            return null;
          }
        })}
    </PageLayout>
  );
};
