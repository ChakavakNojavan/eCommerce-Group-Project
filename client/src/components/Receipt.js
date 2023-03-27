import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

// Component to render receipt page
const Receipt = ({ customerInfo, dispatch, cart }) => {
  const [cartPurchase, setcartPurchase] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const BASE = "http://localhost:4000/api";
  const api = {
    emptyCart: () => fetch(`${BASE}/cart`, { method: "DELETE" }),
  };

  // Function to empty cart after receipt is rendered
  const emptyCart = async () => {
    await api.emptyCart();
    dispatch({ type: "EMPTY_CART" });
  };

  // Fetch cart items data from API endpoint and set state
  useEffect(() => {
    fetch(`/api/cart`)
      .then((res) => res.json())
      .then((data) => {
        setcartPurchase(data);
        console.log(data);
        emptyCart();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Calculate total price of items in cart
  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, []);

  // Render receipt
  return (
    <Container>
      <Title>Receipt</Title>
      <DetailRow>
        <strong>Full Name: </strong>
        <span>{customerInfo.fullName}</span>
      </DetailRow>
      <DetailRow>
        <strong>Email: </strong>
        <span>{customerInfo.email}</span>
      </DetailRow>
      <DetailRow>
        <strong>Address: </strong>
        <span>{customerInfo.address}</span>
      </DetailRow>
      <DetailRow>
        <strong>City: </strong>
        <span>{customerInfo.city}</span>
      </DetailRow>
      <DetailRow>
        <strong>ZIP Code: </strong>
        <span>{customerInfo.zipCode}</span>
      </DetailRow>
      <DetailRow>
        <strong>Your Items: </strong>
        {cartPurchase.map((item) => {
          return (
            <div>
              <li>{item.name}{" "}{item.price}</li>
            </div>
          );
        })}
      </DetailRow>
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
    </Container>
  );
};

export default Receipt;

// Styled components for receipt page
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
  margin-bottom: 0.5rem;
`;
