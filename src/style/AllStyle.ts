import styled from "styled-components";

interface font {
  size?: number;
  color?: string;
  isBold?: boolean;
  align?: string;
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
    color: var(--theme-color);
    font-family: "NotoSansKR-Bold";
  }
`;

export const ArrowImg = styled.img`
  width: 20px;
  height: 20px;
`;

export interface box {
  width?: number | string;
  height?: number | string;
  margin?: string;
  isCursor?: boolean;
  columnGap?: number | string;
  rowGap?: number | string;
  isActive?: boolean;
  backgroundColor?: string;
}

const BoxType = styled.div`
  display: flex;
  width: ${(props: box) => props.width}px;
  height: ${(props: box) => props.height}px;
  margin: ${(props: box) => props.margin};
  background-color: ${(props: box) => props.backgroundColor};
`;

export const AllFontBox = styled(BoxType)`
  flex-direction: column;
  row-gap: ${(props: box) => props.rowGap}px;
`;

export const AllColumnBox = styled(BoxType)`
  flex-direction: column;
  row-gap: ${(props: box) => props.rowGap}px;
  cursor: ${(props: box) => (props.isCursor ? "pointer" : "")};
`;

export const AllRowBox = styled(BoxType)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: ${(props: box) => props.columnGap}px;
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
  background-color: ${(props: box) =>
    props.isActive ? "var(--theme-color)" : "#f7f7f7"};
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
  background-color: var(--theme-color);
  border: none;
  cursor: pointer;
`;
