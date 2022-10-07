import styled from "styled-components";

interface font {
  size?: number;
  color?: string;
  isBold?: boolean;
  //   isDisable?: boolean;
  align?: string;
  //   weight?: number;
  //   lineHeight?: string;
  isWhiteSpace?: boolean;
}

export const AllFont = styled.p`
  font-size: ${(props: font) => props.size}px;
  font-family: ${(props: font) =>
    props.isBold ? "NotoSansKR-Bold" : "NotoSansKR-Regular"};
  color: ${(props: font) => (props.color ? props.color : "#000000")};
  margin: 0;
  white-space: ${(props: font) => (props.isWhiteSpace ? "pre-line" : "")};
  text-align: ${(props: font) => (props.align ? props.align : "")};
  & > span:nth-of-type(1) {
    color: #ffd600;
    font-family: "NotoSansKR-Bold";
  }
  /* & > span:nth-of-type(2) {
    color: #cccccc;
    font-family: "NotoSansKR-Regular";
    font-size: 14px;
  } */
`;

export const ArrowImg = styled.img`
  width: 20px;
  height: 20px;
`;

interface box {
  width?: number | string;
  height?: number | string;
  margin?: string;
  //   isSide?: boolean;
  isCursor?: boolean;
  //   isAlignSide?: boolean;
  //   isContentSide?: boolean;
  //   direction?: string;
  // padding?: string;
  columnGap?: number | string;
  rowGap?: number | string;
  //   border?: string;
  isActive?: boolean;
  borderRadius?: string;
  backgroundColor?: string;
}

export const AllFontBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: box) => props.width}px;
  height: ${(props: box) => props.height}px;
  margin: ${(props: box) => props.margin};
  row-gap: ${(props: box) => props.rowGap}px;
`;

export const AllColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: box) => props.width}px;
  height: ${(props: box) => props.height}px;
  row-gap: ${(props: box) => props.rowGap}px;
  margin: ${(props: box) => props.margin};
  cursor: ${(props: box) => (props.isCursor ? "pointer" : "")};
  /* background-color: ${(props: box) =>
    props.isActive ? "#ffd300" : "#f7f7f7"}; */
`;

export const AllRowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props: box) => props.width}px;
  height: ${(props: box) => props.height}px;
  margin: ${(props: box) => props.margin};
  column-gap: ${(props: box) => props.columnGap}px;
  background-color: ${(props: box) => props.backgroundColor};
  cursor: ${(props: box) => (props.isCursor ? "pointer" : "")};
`;

export const ActiveClickBox = styled.div`
  width: 100%;
  height: 22px;
  border-radius: 22px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props: box) => (props.isActive ? "#ffd300" : "#f7f7f7")};
`;

export const AllBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 23px;
  width: 100%;
  height: 50px;
  margin: ${(props: box) => props.margin};
  background-color: #ffd300;
  border: none;
  cursor: pointer;
`;
