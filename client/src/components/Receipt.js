import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  margin-top: 2rem;
  display: block;
  max-width: 950px;
  margin: 0 auto;
  margin-top: 2rem;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  padding: 20px 30px;
  border-radius: 10px;
  background-color: #fefefe;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Receipt = ({ customerInfo }) => {
  const [cartPurchase, setcartPurchase] = useState([]);

  useEffect(() => {
    fetch(`/api/cart`)
      .then((res) => res.json())
      .then((data) => {
        setcartPurchase(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Title>Receipt</Title>
      <DetailRow>
        <strong>Full Name:</strong>
        <span>{customerInfo.fullName}</span>
      </DetailRow>
      <DetailRow>
        <strong>Email:</strong>
        <span>{customerInfo.email}</span>
      </DetailRow>
      <DetailRow>
        <strong>Address:</strong>
        <span>{customerInfo.address}</span>
      </DetailRow>
      <DetailRow>
        <strong>City:</strong>
        <span>{customerInfo.city}</span>
      </DetailRow>
      <DetailRow>
        <strong>ZIP Code:</strong>
        <span>{customerInfo.zipCode}</span>
      </DetailRow>
      <DetailRow>
        <strong>Your Items:</strong>
        {cartPurchase.map((item) => {
          return (
            <div>
              <p>{item.name}</p>
              <span>${item.price}</span>
            </div>
          );
        })}
      </DetailRow>
    </Container>
  );
};

export default Receipt;
