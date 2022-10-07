import { ArrowImg } from "../style/AllStyle";
import styled from "styled-components";
import backbtnimg from "../assets/icons/icon-back-black.png";
import { useNavigate } from "react-router";

export const BackArrowImg = styled(ArrowImg)`
  position: fixed;
  left: 25px;
  cursor: pointer;
`;

interface BtnProps {
  btnOnClick?: () => void;
}

export const BackButton = ({ btnOnClick }: BtnProps) => {
  const nav = useNavigate();
  return (
    <BackArrowImg
      src={backbtnimg}
      alt="뒤로가기버튼"
      onClick={() => {
        if (btnOnClick) {
          btnOnClick();
        }
      }}
    ></BackArrowImg>
  );
};
