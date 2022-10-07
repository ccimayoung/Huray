import { AllColumnBox, AllRowBox } from "../style/AllStyle";
import styled from "styled-components";

interface progress {
  isProgress?: boolean;
}

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props: progress) => (props.isProgress ? "#ffd300" : "")};
  border: 2px solid
    ${(props: progress) => (props.isProgress ? "#ffd300" : "#999999")};
`;

const Line = styled.div`
  width: calc((100% - 95px) / 3);
  height: 2px;
  background-color: ${(props: progress) => (props.isProgress ? "#ffd300" : "")};
  border: 1px solid
    ${(props: progress) => (props.isProgress ? "#ffd300" : "#999999")};
`;

export const ProgressBar = () => {
  return (
    <AllRowBox columnGap={7} margin="50px auto 20px auto">
      <Circle />
      <Line />
      <Circle />
      <Line />
      <Circle />
      <Line />
      <Circle />
    </AllRowBox>
  );
};
