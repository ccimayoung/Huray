import styled from "styled-components";
import { useRecoilState } from "recoil";
import React from "react";
import { modalStste, questionState } from "../recoil/store";
import rejectimg from "../assets/icons/reject.png";
import { AllFont, AllFontBox, AllRowBox } from "../style/AllStyle";
import { useNavigate } from "react-router";

const ModalBackground = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 5;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;
  border-radius: 20px;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 5;
`;

const QuitBox = styled.div`
  width: 40px;
  height: 40px;
  top: 10px;
  right: 10px;
  border-radius: 50px;
  background-color: #ffffff;
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuitImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ChooseBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 23px;
  width: 100px;
  height: 50px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: var(--theme-color);
  }
`;

export const ResetUserAnswerModal = () => {
  const [askResetUserAnswer, setAskResetUserAnswer] =
    useRecoilState(modalStste);
  const [questionList, setQuestionList] = useRecoilState(questionState);
  const nav = useNavigate();
  return (
    <>
      {askResetUserAnswer && (
        <ModalBackground onClick={() => setAskResetUserAnswer(false)}>
          <BoxWrap
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <QuitBox>
              <QuitImg
                src={rejectimg}
                alt="닫음 이미지"
                onClick={() => setAskResetUserAnswer(false)}
              />
            </QuitBox>
            <AllFontBox margin="70px auto 0 auto">
              <AllFont align="center" isWhiteSpace={true} isBold={true}>
                {`초기화면으로 돌아가는 경우
                지금까지 저장된 답변이 `}
                <span>{`초기화`}</span>
                {`됩니다.`}
              </AllFont>
            </AllFontBox>
            <AllRowBox
              className="버튼모음"
              columnGap={10}
              margin="30px auto 0 auto"
            >
              <ChooseBtn onClick={() => setAskResetUserAnswer(false)}>
                머무르기
              </ChooseBtn>
              <ChooseBtn
                onClick={() => {
                  nav(-1);
                  const closeModalTimer = setTimeout(() => {
                    setAskResetUserAnswer(false);
                    const resetCurrentnumberTimer = setTimeout(() => {
                      setQuestionList({ ...questionList, currentnumber: 0 });
                      clearTimeout(resetCurrentnumberTimer);
                    }, 100);
                    clearTimeout(closeModalTimer);
                  }, 100);
                }}
              >
                초기화면
              </ChooseBtn>
            </AllRowBox>
          </BoxWrap>
        </ModalBackground>
      )}
    </>
  );
};
