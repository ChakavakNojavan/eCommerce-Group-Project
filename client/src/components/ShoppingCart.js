import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

// API base URL
const BASE = "http://localhost:4000/api";

// Functions for fetching cart data, adding items, updating quantities, deleting items, and emptying the cart
const api = {
  getCart: () => fetch(`${BASE}/cart`).then((res) => res.json()),
  addToCart: (_id) => fetch(`${BASE}/cart/${_id}`, { method: "POST" }),
  updateQuantity: (_id, quantity) =>
    fetch(`${BASE}/cart/${_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }),
  deleteItem: (_id) => fetch(`${BASE}/cart/${_id}`, { method: "DELETE" }),
  emptyCart: () => fetch(`${BASE}/cart`, { method: "DELETE" }),
};

// Component for rendering the shopping cart
const Cart = ({ cart, dispatch }) => {
  // this is to make use of the useNavigate hook
  const navigate = useNavigate();
  // Click handler for the checkout button
  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  //This function remove an item from the cart by sending a DELETE request to the API and using the delete dispatch from the reducer
  const removeItemFromCart = async (_id) => {
    await api.deleteItem(_id);
    dispatch({ type: "REMOVE_ITEM", _id });
  };

  //This function update the quantity of an item in the cart by sending a PATCH request to the API
  // If the requested quantity is less than zero or greater than the number in stock, return without making any changes
  // If the requested quantity is zero, remove the item from the cart
  // Otherwise, update the quantity in the API and in the cart
  const updateItemQuantity = async (_id, quantity, numInStock) => {
    if (quantity < 0) return;
    if (quantity > numInStock) return;
    if (quantity === 0) {
      await removeItemFromCart(_id);
    } else {
      await api.updateQuantity(_id, quantity);
      dispatch({ type: "UPDATE_QUANTITY", _id, quantity });
    }
  };
  //This function empty the whole cart by sending a DELETE request to the API using the EMPTY_CART dispatch from the reducer
  const emptyCart = async () => {
    await api.emptyCart();
    dispatch({ type: "EMPTY_CART" });
  };
  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );
  // Render the cart component
  return (
    <>
      {cart.length === 0 ? (
        <LoadingDiv>
          <h2>Your Cart Looks Empty!</h2>
        </LoadingDiv>
      ) : (
        <Container>
          {cart.map((item) => {
            return (
              <CartItem key={item._id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.price}</ItemPrice>
                </ItemInfo>
                <QuantityControl>
                  <span>Quantity:</span>
                  <DecrementButton
                    onClick={() =>
                      updateItemQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </DecrementButton>
                  <QuantityInput
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItemQuantity(item._id, parseInt(e.target.value))
                    }
                  />
                  <IncrementButton
                    onClick={() =>
                      updateItemQuantity(
                        item._id,
                        item.quantity + 1,
                        item.numInStock
                      )
                    }
                    disabled={item.quantity >= item.numInStock}
                  >
                    +
                  </IncrementButton>

                  {item.quantity >= item.numInStock && (
                    <p style={{ color: "red" }}>
                      Maximum quantity reached for this item.
                    </p>
                  )}

                  <Button onClick={() => removeItemFromCart(item._id)}>
                    Remove
                  </Button>
                </QuantityControl>
              </CartItem>
            );
          })}
          <TotalPrice>Total: ${totalPrice.toFixed(2)}</TotalPrice>
          <Button onClick={handleCheckoutClick}>Checkout</Button>
          <Button onClick={emptyCart}>Empty Cart</Button>
        </Container>
      )}
    </>
  );
};

// Styled-components for the loading div, container, cart item, item info, item name,
// item price, quantity control, quantity input, button, increment button, decrement button, and total price
const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  font-family: sans-serif;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ItemInfo = styled.div``;

const ItemName = styled.div`
  font-weight: bold;
`;

const ItemPrice = styled.div`
  color: #999;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityInput = styled.input`
  width: 50px;
  margin: 0 0.5rem;
`;

const Button = styled.button`
  background-color: #aa726c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  cursor: pointer;
`;
const IncrementButton = styled(Button)`
  margin-left: 0.5rem;
  &:disabled {
    opacity: 0.5;
  }
`;

const DecrementButton = styled(Button)`
  margin-right: 0.5rem;
`;
const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

export default Cart;
