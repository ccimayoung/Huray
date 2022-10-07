import React from "react";
import { PageLayout } from "../component/layout/PageLayout";
import styled from "styled-components";
import { AllBtn, AllColumnBox, AllFont, AllFontBox } from "../style/AllStyle";
import { BackButton } from "../component/BackButton";
import surveyimg from "../assets/icons/image-survey.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useRecoilState } from "recoil";
import { surveyTypeState } from "../recoil/store";

export const HeadLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* background-color: pink; */
  position: relative;
  margin: 20px 0;
`;

export const SurveyStart = () => {
  const nav = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const name = params.get("name");
  const [surveyType, setSurveyType] = useRecoilState(surveyTypeState);

  const baseApi = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000,
  });

  const suerveyGet = async () => {
    await baseApi.get(`/surveys.json`).then((res) => {
      setSurveyType({ surveys: res.data.surveys, userId: id, userName: name });
    });
  };

  React.useEffect(() => {
    suerveyGet();
  }, []);

  console.log(surveyType);
  return (
    <PageLayout>
      <HeadLine className="상단Nav, 헤드라인">
        <BackButton></BackButton>
        <AllFont isBold={true}>기초설문</AllFont>
      </HeadLine>
      <AllColumnBox className="본문" margin="50px 0 0 0" rowGap={7}>
        <AllFont isBold={true} isWhiteSpace={true} size={20}>
          {`나쁜 생활습관을 바로 잡으면
          건강이 개선됩니다.`}
        </AllFont>
        <AllFont isWhiteSpace={true} color={"#444444"} size={14}>
          {`설문을 통해 나의 건강 상태를 확인하고,
          개선할 습관이 무엇인지 알아보아요!
          결과에 따라 나만의 관리 목표를 설정하면
          헬스매니저가 ${name}님께 맞는
          건강관리 서비스를 제공합니다.`}
        </AllFont>
        <img
          style={{ width: "200px", margin: "30px 10% 0 auto" }}
          src={surveyimg}
          alt="설문조사이미지"
        ></img>
      </AllColumnBox>
      <AllColumnBox className="하단" margin="20px auto 0 auto">
        <AllFont isBold={true} align={"center"}>
          {`설문은 총 `}
          <span>
            {id !== null && surveyType.surveys[id]?.questions.length}문항
          </span>
          {`입니다.`}
        </AllFont>
      </AllColumnBox>
      <AllBtn
        margin="20px 0"
        onClick={() => {
          nav("/surveyselectone");
        }}
      >
        <AllFont isBold={true} size={14}>
          설문 시작
        </AllFont>
      </AllBtn>
    </PageLayout>
  );
};
