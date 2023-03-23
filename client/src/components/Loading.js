import React from "react";
import { IconContext } from "react-icon-context";
import { FiLoader } from "react-icon";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`;

export const Loading = () => {
  return (
    <IconDiv>
      <IconContext.Provider value={{ size: "2rem " }}>
        <FiLoader />
      </IconContext.Provider>
    </IconDiv>
  );
};

const IconDiv = styled.div`
  position: absolute;
  left: 20;
  top: 45;
  animation: ${rotate} 2s linear infinite;
  opacity: 0, 5;
  width: 60vw;
  display: flex;
  justify-content: center;
`;