import { PropsWithChildren } from "react";
import styled from "styled-components";

const LayoutWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 30px;
  min-width: 360px;
`;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: skyblue; */
`;

const BodyWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutWrap>
      <LayoutContainer>
        <BodyWrapper>{children}</BodyWrapper>
      </LayoutContainer>
    </LayoutWrap>
  );
};
