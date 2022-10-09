import { ArrowImg } from "../style/AllStyle";
import styled from "styled-components";
import backbtnimg from "../assets/icons/icon-back-black.png";

export const BackArrowImg = styled(ArrowImg)`
  position: fixed;
  left: 25px;
  cursor: pointer;
`;

interface BtnProps {
  btnOnClick?: () => void;
}

export const BackButton = ({ btnOnClick }: BtnProps) => {
  return (
    <BackArrowImg
      src={backbtnimg}
      alt="<- 뒤로가기 이미지"
      onClick={() => {
        if (btnOnClick) {
          btnOnClick();
        }
      }}
    ></BackArrowImg>
  );
};
