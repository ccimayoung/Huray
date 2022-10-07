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

export const SurveySelectVarious = () => {
  const [select, setSelect] = useState<number[]>([]);
  const nav = useNavigate();
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
      <AllRowBox
        className="문제번호"
        width={45}
        height={20}
        margin="20px auto 10px 0"
        backgroundColor="green"
        columnGap={10}
      >
        <AllFont isBold={true} size={16}>
          {<span style={{ fontSize: "20px" }}>1 </span>}
        </AllFont>
        <AllFont color="#cccccc">/ 3</AllFont>
      </AllRowBox>
      <AllFont className="문제">
        가장 개선시키고 싶은 나의 식습관을 고른다면? (복수선택)
      </AllFont>
      <AllColumnBox className="보기" margin="25px auto 100px auto" rowGap={10}>
        <ActiveClickBox
          onClick={
            select.includes(0)
              ? () => {
                  setSelect([]);
                }
              : () => {
                  setSelect([...select, 0]);
                }
          }
          isActive={select.includes(0) ? true : false}
        >
          야식
        </ActiveClickBox>
        <ActiveClickBox
          onClick={
            select.includes(1)
              ? () => {
                  setSelect([]);
                }
              : () => {
                  setSelect([...select, 1]);
                }
          }
          isActive={select.includes(1) ? true : false}
        >
          간식중독
        </ActiveClickBox>
        <ActiveClickBox
          onClick={
            select.includes(2)
              ? () => {
                  setSelect([]);
                }
              : () => {
                  setSelect([...select, 2]);
                }
          }
          isActive={select.includes(2) ? true : false}
        >
          빈번한 알코올 섭취
        </ActiveClickBox>
        <ActiveClickBox>폭식</ActiveClickBox>
        <ActiveClickBox>탄수화물 중독</ActiveClickBox>
        <ActiveClickBox>기타</ActiveClickBox>
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
            nav(-1);
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
          isCursor={select.length !== 0 ? true : false}
          onClick={
            select.length !== 0
              ? () => {
                  nav("/surveyfinish");
                }
              : () => {
                  ("");
                }
          }
        >
          <AllFont
            isBold={true}
            color={select.length !== 0 ? "#ffd600" : "#cccccc"}
          >
            다음
          </AllFont>
          <ArrowImg
            src={select.length !== 0 ? nextactiveimg : nextimg}
          ></ArrowImg>
        </AllRowBox>
      </AllRowBox>
    </PageLayout>
  );
};
