//test by chaka
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
import Checkout from "./Checkout";

const App = () => {
  return (
    //all the routes can change, I just put them as place holders, as well as the elements!
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:_id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
