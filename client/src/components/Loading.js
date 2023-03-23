import React from "react";
import { IconContext } from "react-icons";
import { FiLoader } from "react-icons/fi";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`;

const Loading = () => {
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
  font-size:15em;
  display: flex;
  justify-content: center;
`;

export default Loading;