import { AllRowBox } from "../style/AllStyle";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { questionState, surveyTypeState } from "../recoil/store";

interface progress {
  isProgress?: boolean;
}

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props: progress) =>
    props.isProgress ? "var(--theme-color)" : ""};
  border: 2px solid
    ${(props: progress) =>
      props.isProgress ? "var(--theme-color)" : "#999999"};
`;

const Line = styled.div`
  width: calc((100% - 95px) / 3);
  height: 2px;
  background-color: ${(props: progress) =>
    props.isProgress ? "var(--theme-color)" : ""};
  border: 1px solid
    ${(props: progress) =>
      props.isProgress ? "var(--theme-color)" : "#999999"};
`;

export const ProgressBar = () => {
  const surveyType = useRecoilValue(surveyTypeState);
  const questionList = useRecoilValue(questionState);

  let progressRate =
    (3 / (surveyType.surveys[surveyType.userId].questions.length - 2)) *
    questionList.currentnumber;

  return (
    <AllRowBox columnGap={7} margin="50px auto 20px auto">
      <Circle isProgress={true} />
      <Line isProgress={progressRate > 1} />
      <Circle isProgress={progressRate > 1} />
      <Line isProgress={progressRate > 2} />
      <Circle isProgress={progressRate > 2} />
      <Line
        isProgress={
          progressRate > 3 ||
          surveyType.surveys[surveyType.userId].questions.length ===
            questionList.currentnumber
        }
      />
      <Circle
        isProgress={
          progressRate > 3 ||
          surveyType.surveys[surveyType.userId].questions.length ===
            questionList.currentnumber
        }
      />
    </AllRowBox>
  );
};
