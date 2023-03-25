import React, { useState } from "react";
import styled from "styled-components";
import Receipt from "./Receipt";

const Form = styled.form`
  margin-top: 2rem;
  display: block;
  max-width: 950px;
  margin: 0 auto;
  margin-top: 2rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  padding: 20px 30px;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const FormButton = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
  width: 30%;
`;

const Checkout = () => {
  const [showReceipt, setShowReceipt] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowReceipt(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name:</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            value={customerInfo.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={customerInfo.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Address:</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={customerInfo.address}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            name="city"
            id="city"
            value={customerInfo.city}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="zipCode">ZIP Code:</Label>
          <Input
            type="text"
            name="zipCode"
            id="zipCode"
            value={customerInfo.zipCode}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormButton type="submit">Submit</FormButton>
      </Form>
      {showReceipt && <Receipt customerInfo={customerInfo} />}
    </>
  );
};

export default Checkout;
