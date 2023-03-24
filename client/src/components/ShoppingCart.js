import React, { useReducer, useEffect } from "react";
import { cartReducer } from "./CartReducer";
import styled from "styled-components";
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
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
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

const BASE = "http://localhost:4000/api";

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

const initialState = [];

const Cart = ({ updateCartItemCount }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    api.getCart().then((data) => {
      console.log("Cart data:", data);
      dispatch({ type: "SET_CART", cart: data });
      const itemCount = data.reduce((total, item) => total + item.quantity, 0);
      updateCartItemCount(itemCount);
    });
  }, []);

  const addItemToCart = async (_id) => {
    await api.addToCart(_id);
    dispatch({ type: "ADD_ITEM", _id });
    const updatedCartItemCount =
      cart.reduce((total, item) => total + item.quantity, 0) + 1;
    updateCartItemCount(updatedCartItemCount);
  };

  const removeItemFromCart = async (_id) => {
    await api.deleteItem(_id);
    dispatch({ type: "REMOVE_ITEM", _id });
    const updatedCartItemCount = cart.reduce(
      (total, item) => total + (item._id === _id ? 0 : item.quantity),
      0
    );
    updateCartItemCount(updatedCartItemCount);
  };

  const updateItemQuantity = async (_id, quantity, numInStock) => {
    if (quantity < 0) return;
    if (quantity > numInStock) return;
    if (quantity === 0) {
      await removeItemFromCart(_id);
    } else {
      await api.updateQuantity(_id, quantity);
      dispatch({ type: "UPDATE_QUANTITY", _id, quantity });
    }
    const updatedCartItemCount = cart.reduce(
      (total, item) => total + (item._id === _id ? quantity : item.quantity),
      0
    );
    updateCartItemCount(updatedCartItemCount);
  };

  const emptyCart = async () => {
    await api.emptyCart();
    dispatch({ type: "EMPTY_CART" });
    updateCartItemCount(0);
  };
  const totalPrice = cart.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );
  return (
    <Container>
      {cart.map((item) => {
        console.log(`Max quantity for ${item.name}:`, item.numInStock);

        return (
          <CartItem key={item._id}>
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price}</ItemPrice>
            </ItemInfo>
            <QuantityControl>
              <span>Quantity:</span>
              <DecrementButton
                onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
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
      <Button>Checkout</Button>
      <Button onClick={emptyCart}>Empty Cart</Button>
    </Container>
  );
};

export default Cart;
