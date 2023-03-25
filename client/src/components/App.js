import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import SingleProduct from "./SingleProduct";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HomePage from "./Homepage";
import Products from "./Products";
import Cart from "./ShoppingCart";
import Affiliates from "./Affiliates";
import GlobalStyles from "../GlobalStyles";
import { useReducer, useEffect } from "react";
import { cartReducer } from "./CartReducer";
import Checkout from "./Checkout";

const App = () => {

  //setting an initialState to be used by the reducer
  const initialState = [];
  // This code initializes a shopping cart state using the useReducer hook
  // and calculates the total number of items in the cart by reducing the cart array
  // and summing up the quantity of each item. 
  //cartItemCount is then passed down to the appropriate components
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
 
  //This useEffect is fetching the data from the cart api, which then dispatches the SET_Cart action
  useEffect(() => {
    fetch("http://localhost:4000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_CART", cart: data });
      });
  }, []);
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/* this is the navbar component that is displayed on all pages */}
      <Navbar cartItemCount={cartItemCount} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/products"
          element={<Products cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/products/:_id"
          element={<SingleProduct cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
      {/* this is the footer component that is displayed on all pages */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
