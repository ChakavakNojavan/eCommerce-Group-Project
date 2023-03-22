import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const HomePage = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }, [setProducts]);

  return (
    <>
      {!products ? (
        <h2>Loading</h2>
      ) : (
        <>
          <BackgroundDiv>
            <Quote>
              "Stay Connected, Stay Stylish with Our Smart "{" "}
              <Span>Watches!</Span>
            </Quote>
          </BackgroundDiv>

          <ImageDiv>
            <ProductDiv>
              <img src={products[0].imageSrc} alt="" />
              <Price>{products[0].price}</Price>
              <ProductName>{products[0].name}</ProductName>
            </ProductDiv>
            <ProductDiv>
              <img src={products[1].imageSrc} alt="" />
              <Price>{products[1].price}</Price>
              <ProductName>{products[1].name}</ProductName>
            </ProductDiv>
            <ProductDiv>
              <img src={products[2].imageSrc} alt="" />
              <Price>{products[2].price}</Price>
              <ProductName>{products[2].name}</ProductName>
            </ProductDiv>
          </ImageDiv>
        </>
      )}
    </>
  );
};

const BackgroundDiv = styled.div`
  background-image: url("desert.jpg");
  background-size: cover;
  height: 28em;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;
const ImageDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 1.5em;
`;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProductName = styled.p`
  width: 9em;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
const Price = styled.p`
  background-color: white;
  border-radius: 10px;
`;
const Span = styled.span`
  color: #fcca46;
  font-weight: 600;
`;

const Quote = styled.h1`
  font-style: italic;
  font-size: 40px;
  font-weight: 100;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
  color: white;

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
