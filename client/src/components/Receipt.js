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

const Receipt = ({ customerInfo, dispatch, cart }) => {
  const [cartPurchase, setcartPurchase] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const BASE = "http://localhost:4000/api";
  const api = {
    emptyCart: () => fetch(`${BASE}/cart`, { method: "DELETE" }),
  };
  const emptyCart = async () => {
    await api.emptyCart();
    dispatch({ type: "EMPTY_CART" });
  };

  useEffect(() => {
    fetch(`/api/cart`)
      .then((res) => res.json())
      .then((data) => {
        setcartPurchase(data);
        console.log(data);
        emptyCart()
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
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
              <span>{item.price}</span>
            </div>
          );
        })}
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </DetailRow>
    </Container>
  );
};

export default Receipt;
