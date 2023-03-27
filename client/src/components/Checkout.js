import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Receipt from "./Receipt";

const Form = styled.form`
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const FormButton = styled.button`
  background-color: #aa726c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
`;

const Checkout = () => {
  //Initializes a state variable called showReceipt with a default 
  //value of false, and a function called setShowReceipt that updates the showReceipt variable when called.
    const [showReceipt, setShowReceipt] = useState(false);
    //Initializes a state variable called cart with a default value
    // of null, and a function called setCart that updates the cart variable when called.
    const [cart, setCart] = useState(null)
    //Initializes a state variable called customerInfo with an object containing default
    // values for fullName, email, address, city, and zipCode, and a function called setCustomerInfo 
    //that updates the customerInfo variable when called.
    const [customerInfo, setCustomerInfo] = useState({
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    });
  
    //updates the customerInfo object with a new value for the field that was changed.
    const handleChange = (e) => {
      setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };

    //This function handles the form submission by preventing the default form behavior, 
    //setting the showReceipt state variable to true, and making a PATCH request to the 
    // /update-stock endpoint with the cart state variable as a JSON string in the request body. 
    //The response from the server is then logged to the console.
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowReceipt(true);
        fetch("/update-stock", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
          body: JSON.stringify({itemsArr: cart}),
        })
        .then(res=> res.json())
        .then( data => console.log("response",data))
      };  


    //Runs the code inside the useEffect hook when the component is mounted,
    // fetching the user's cart from the server and updating the cart state variable. 
    //The empty dependency array [] means that this effect will only run once, when the component is mounted.
    useEffect(() => {
      fetch("/api/cart")
      .then(res => res.json())
      .then(data => {
        setCart(data)
        console.log(data)
      })
    }, [])

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