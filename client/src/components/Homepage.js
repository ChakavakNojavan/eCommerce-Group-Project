import React from "react";
import styled from "styled-components";
import Banner from "../../assets/Banner.jpg";
import { Products } from "../products/products";
import { Brands } from "../brands/Brands";
import { AllItems } from "../all-items/AllItems";

export const HomePage = () => {
  return (
    <Wrapper>
      <ImgDiv>
        <BannerImg src={Banner} />
        <Quote>
          "Stay Connected, Stay Stylish with Our Smart " <Span>Watches!</Span>
        </Quote>
      </ImgDiv>
      git checkout -b Mayo_Components git branch
      <NavigationHeadersDiv>
        <NavigationHeaders>Shop by Products</NavigationHeaders>
        <Categories />
      </NavigationHeadersDiv>
      <NavigationHeadersDiv>
        <StyledDiv />
        <NavigationHeaders>Shop by Brand</NavigationHeaders>

        <Brands />
        <StyledDiv />
      </NavigationHeadersDiv>
      <NavigationHeadersDiv>
        <AllItems />
      </NavigationHeadersDiv>
    </Wrapper>
  );
};

const Span = styled.span`
  color: #d45e09;
  font-weight: 600;
`;

const Quote = styled.h1`
  font-style: italic;
  position: absolute;
  top: 260px;
  width: 90%;
  font-size: 40px;
  font-weight: 100;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
  color: white;
  margin: 0 40px;
  z-index: -8;
  @media screen and (max-width: 768px) {
    font-size: 30px;
    top: 260px;
  }
  @media screen and (max-width: 600px) {
    font-size: 20px;
    top: 200px;
  }
  @media screen and (max-width: 375px) {
    font-size: 20px;
    top: 230px;
    left: -40px;
    width: 100vw;
    padding: 20px 20px 20px 20px;
    background-color: black;
    text-shadow: none;
  }
`;

const Wrapper = styled.div``;

const ImgDiv = styled.div`
  display: flex;
  position: relative;
  @media screen and (max-width: 375px) {
    margin-bottom: 100px;
  }
`;

const BannerImg = styled.img`
  height: auto;
  width: 100%;
  z-index: -10;
`;

const StyledDiv = styled.div`
  height: 1px;
  background-color: ${COLORS.orange};
  margin: 4rem 2rem;
  @media screen and (max-width: 600px) {
    margin-right: 5rem;
    margin-left: 5rem;
  }
`;

const NavigationHeadersDiv = styled.div`
  margin: 2rem;
  margin-top: 4rem;
  text-align: center;
`;

const NavigationHeaders = styled.h2`
  font-size: 3rem;
  @media screen and (max-width: 375px) {
    font-size: 2rem;
  }
`;
