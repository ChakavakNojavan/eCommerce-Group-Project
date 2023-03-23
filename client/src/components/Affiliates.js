import React, { useEffect } from "react";
import { defer } from "react-router-dom";
import styled from "styled-components";

const Affiliates = () => {
  useEffect(()=> {
    fetch("/api/companies")
    .then((response) => response.json())
  })
  return <></>;
};

export default Affiliates;
