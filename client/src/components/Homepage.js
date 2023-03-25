import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

// Functional component to render homepage
const HomePage = () => {
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  // Fetch products data from API endpoint
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, [setProducts]);

  // Function to handle product click event
  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Render homepage
  return (
    <>
      {!products ? (
        <Loading />
      ) : (
        <>
          <BackgroundDiv>
            <Quote>
              "From tracking your progress to powering through workouts, sport
              watches are the ultimate fitness companion." - AI
            </Quote>
          </BackgroundDiv>
          <H2>Featured Products</H2>
          <WrapperDiv>
            <ImageDiv>
              {products.slice(0, 6).map((product) => (
                <ProductDiv onClick={() => handleClick(product._id)}>
                  <Img src={product.imageSrc} alt="" />
                  <Price>{product.price}</Price>
                  <ProductName>{product.name}</ProductName>
                </ProductDiv>
              ))}
            </ImageDiv>
          </WrapperDiv>
        </>
      )}
    </>
  );
};

export default HomePage;

// Styled components for homepage
const BackgroundDiv = styled.div`
  background-image: url("/watches.jpg");
  background-size: cover;
  height: 28em;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
`;
const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgb(241, 241, 241);
  padding-bottom: 100px;
`;
const ImageDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 90px;
  margin-top: 3em;
`;

const Img = styled.img`
  border-radius: 40px;
`;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 35px;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  :hover {
    cursor: pointer;
  }
`;
const ProductName = styled.p`
  width: 9em;
  text-align: center;
`;
const Price = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Quote = styled.h1`
  font-style: italic;
  font-size: 35px;
  font-weight: 100;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
  color: white;
  width: 10em;
  line-height: 1.2;
  padding-left: 50px;

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
const H2 = styled.h2`
  font-size: 40px;
  display: flex;
  justify-content: center;
  background-color: rgb(241, 241, 241);
  padding-top: 30px;
`;
